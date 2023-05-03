import grpc from 'grpc';
import { SpreadsheetClient } from './generated/proto/spreadsheet_grpc_pb';
import { Cell, Location, Collaborator } from './generated/proto/spreadsheet_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

const client = new SpreadsheetClient('localhost:50051', grpc.credentials.createInsecure());

function addCell(location: Location, value: string, id: string) {
  const cell = new Cell();
  cell.setLocation(location);
  cell.setValue(value);
  cell.setId(id);
  client.addCell(cell, (error, response) => {
    if (error) {
      console.error('Failed to add cell:', error);
    } else {
      console.log('Cell added successfully');
    }
  });
}

function updateCell(location: Location, value: string, id: string) {
  const cell = new Cell();
  cell.setLocation(location);
  cell.setValue(value);
  cell.setId(id);
  client.updateCell(cell, (error, response) => {
    if (error) {
      console.error('Failed to update cell:', error);
    } else {
      console.log('Cell updated successfully');
    }
  });
}

function getCells() {
  const call = client.getCells(new Empty());
  call.on('data', (cell) => {
    console.log('Received cell:', cell.toObject());
  });
  call.on('end', () => {
    console.log('Finished receiving cells');
  });
}

// Usage examples:
const location = new Location();
location.setRow(1);
location.setColumn(1);
addCell(location, 'Hello', 'A1');
addCell(location, 'Foo', 'A2');
updateCell(location, 'World', 'A1');
updateCell(location, 'World2', 'A1');
updateCell(location, 'World23', 'A1');
getCells();

// // Send concurrent requests
// for (let i = 0; i < 10; i++) {
//   setTimeout(() => {
//     addCell(location, `value${i}`);
//     updateCell(location, `value${i}updated`);
//   }, i * 1000);
// }
// setTimeout(() => {
//   getCells();
// }, 11000);


// real time collaboration testing

const collaborator1 = new Collaborator();
collaborator1.setId('A1');
collaborator1.setName('Alice');

const collaborator2 = new Collaborator();
collaborator2.setId('A2');
collaborator2.setName('Bob');

const call = client.realtimeCollaboration();

call.on('data', (cell: Cell) => {
  console.log(`Received cell ${cell.getId()}: ${cell.getValue()}`);
});

call.on('end', () => {
  console.log('Connection ended');
});

call.on('error', (err) => {
  console.error(err);
});


setTimeout(() => {
  const cell = new Cell();
  cell.setId('A1');
  cell.setValue('Hello from Alice!');
  cell.addCollaborators(collaborator1);
  cell.addCollaborators(collaborator2);
  call.write(collaborator1);
  call.write(collaborator2);
}, 1000);

// setTimeout(() => {
//   const cell = new Cell();
//   cell.setId('A2');
//   cell.setValue('Hello from Bob!');
//   cell.addCollaborators(collaborator1);
//   cell.addCollaborators(collaborator2);
//   call.write(cell);
// }, 2000);
