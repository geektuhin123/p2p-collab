import grpc from 'grpc';
// import * as protoLoader from '@grpc/proto-loader';
import {  SpreadsheetService } from './generated/proto/spreadsheet_grpc_pb';
import {  Cell } from './generated/proto/spreadsheet_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

const cells = new Map<string, Cell>();
const locks = new Map<string, grpc.ServerUnaryCall<Cell>>();

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
  const server = new grpc.Server();
  server.addService(SpreadsheetService, { addCell, updateCell, getCells });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('Server started on port 50051');
}

startServer();
