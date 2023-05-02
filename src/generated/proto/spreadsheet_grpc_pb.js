// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_spreadsheet_pb = require('../proto/spreadsheet_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_spreadsheet_Cell(arg) {
  if (!(arg instanceof proto_spreadsheet_pb.Cell)) {
    throw new Error('Expected argument of type spreadsheet.Cell');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_spreadsheet_Cell(buffer_arg) {
  return proto_spreadsheet_pb.Cell.deserializeBinary(new Uint8Array(buffer_arg));
}


var SpreadsheetService = exports.SpreadsheetService = {
  addCell: {
    path: '/spreadsheet.Spreadsheet/AddCell',
    requestStream: false,
    responseStream: false,
    requestType: proto_spreadsheet_pb.Cell,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_spreadsheet_Cell,
    requestDeserialize: deserialize_spreadsheet_Cell,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  updateCell: {
    path: '/spreadsheet.Spreadsheet/UpdateCell',
    requestStream: false,
    responseStream: false,
    requestType: proto_spreadsheet_pb.Cell,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_spreadsheet_Cell,
    requestDeserialize: deserialize_spreadsheet_Cell,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  getCells: {
    path: '/spreadsheet.Spreadsheet/GetCells',
    requestStream: false,
    responseStream: true,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: proto_spreadsheet_pb.Cell,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_spreadsheet_Cell,
    responseDeserialize: deserialize_spreadsheet_Cell,
  },
};

exports.SpreadsheetClient = grpc.makeGenericClientConstructor(SpreadsheetService);
