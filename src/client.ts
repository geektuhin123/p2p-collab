import grpc from 'grpc';
import { SpreadsheetClient } from './generated/proto/spreadsheet_grpc_pb';
import { Cell, Location } from './generated/proto/spreadsheet_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

const client = new SpreadsheetClient('localhost:50051', grpc.credentials.createInsecure());

function addCell(location: Location, value: string) {
  const cell = new Cell();
  cell.setLocation(location);
  cell.setValue(value);
  cell.setId(`A1`);
  client.addCell(cell, (error, response) => {
    if (error) {
      console.error('Failed to add cell:', error);
    } else {
      console.log('Cell added successfully');
    }
  });
}

function updateCell(location: Location, value: string) {
  const cell = new Cell();
  cell.setLocation(location);
  cell.setValue(value);
  cell.setId('A1');
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
// addCell(location, 'Hello');
// updateCell(location, 'World');
// updateCell(location, 'World2');
// updateCell(location, 'World23');
// getCells();

// Send concurrent requests
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    addCell(location, `value${i}`);
    updateCell(location, `value${i}updated`);
  }, i * 1000);
}
setTimeout(() => {
  getCells();
}, 11000);