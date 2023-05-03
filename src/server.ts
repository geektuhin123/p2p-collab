import grpc from 'grpc';
// import * as protoLoader from '@grpc/proto-loader';
import {  SpreadsheetService } from './generated/proto/spreadsheet_grpc_pb';
import {  Cell, Collaborator } from './generated/proto/spreadsheet_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
// import { Message } from 'google-protobuf';
// import * as Automerge from '@automerge/automerge'

const cells = new Map<string, Cell>();
const locks = new Map<string, any>();
const clients: Set<grpc.ServerDuplexStream<Collaborator, Cell>> = new Set();

// Initialize a new Automerge document
// let sharedDoc = Automerge.init();

// sharedDoc = Automerge.change(sharedDoc, 'Add card', (doc: any) => {
//   doc.cards = []
//   doc.cards.push({ title: 'Rewrite everything in Clojure', done: false })
//   doc.cards.push({ title: 'Rewrite everything in Haskell', done: false })
// });

function addCell(call: grpc.ServerUnaryCall<Cell>, callback: grpc.sendUnaryData<Empty>) {
  const cell = call.request;
  if (locks.has(cell.getId())) {
    return callback(new Error('Cell is currently locked'), cell);
  }
  locks.set(cell.getId(), call);
  cells.set(cell.getId(), cell);
  locks.delete(cell.getId());

  // Simulate a long-running operation to test locks
  // setTimeout(() => {
  //   locks.delete(cell.getId());
  //   callback(null, new Empty());
  // }, 5000);

  console.log(`-----added cell`, cells);
  callback(null, new Empty());
}


function updateCellStream(call: grpc.ServerDuplexStream<Cell, Cell>) {
  call.on('data', (cell: Cell) => {
    if (locks.has(cell.getId())) {
      const errorCell = new Cell();
      errorCell.setId(cell.getId());
      errorCell.setError('Cell is currently locked');
      call.write(errorCell);
      return;
    }
    locks.set(cell.getId(), call);
    cells.set(cell.getId(), cell);
    locks.delete(cell.getId());
    call.write(cell);
    call.write(new Cell()); // send empty message to keep stream alive
  });

  call.on('end', () => {
    call.end();
  });
}

function hasCell(cellId: string): boolean {
  return cells.has(cellId);
}

function getCell(cellId: string): Cell | undefined {
  return cells.get(cellId);
}

function broadcast(cell: Cell) {
  for (const client of clients) {
    client.write(cell);
  }
}




function realtimeCollaboration(call: grpc.ServerDuplexStream<Collaborator, Cell>) {

  call.on('data', (collaborator: Collaborator) => {
    console.log(`Adding collaborator ${collaborator.getName()}`);
    clients.add(call);
    console.log(`Received cell update: ${JSON.stringify(collaborator.toObject())}`);
    if (!hasCell(collaborator.getId())) {
      console.log(`Cell ${collaborator.getId()} not found`);
      return;
    }
    // // Make changes to the local copy of the document
    // const newDoc = Automerge.change(sharedDoc, (doc: any) => {
    //   // Add a new item to the document
    //   doc.cards.push({ title: 'Rewrite everything in Clojure', done: false })
    // })
    // let binary = Automerge.save(newDoc)
    // console.log(`binary`, binary)
    const broadcastCell = cells.get(collaborator.getId());
    broadcastCell.setValue(collaborator.getName() + `_value`);
    cells.set(collaborator.getId(), broadcastCell);
    console.log(`Broadcasting cell update`);
    broadcast(broadcastCell);
  });

  call.on('end', () => {
    console.log('Client disconnected');
    clients.delete(call);
  });

  call.on('error', () => {
    console.log('Client disconnected due to error');
    clients.delete(call);
  });

  call.on('close', () => {
    console.log('Client closed connection');
    clients.delete(call);
  });
}



function updateCell(call: grpc.ServerUnaryCall<Cell>, callback: grpc.sendUnaryData<Empty>) {
  const cell = call.request;
  if (locks.has(cell.getId())) {
    return callback(new Error('Cell is currently locked'), cell);
  }
  locks.set(cell.getId(), call);
  cells.set(cell.getId(), cell);
  locks.delete(cell.getId());
  console.log(`-----updateCell`, cells);
  callback(null, new Empty());
}

function getCells(call: grpc.ServerWritableStream<Empty>) {
  for (const cell of cells.values()) {
    call.write(cell);
  }
  call.end();
}

function startServer() {
  const server: any = new grpc.Server();
  server.addService(SpreadsheetService, { addCell, updateCell, getCells, updateCellStream, realtimeCollaboration });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('Server started on port 50051');
}

startServer();
