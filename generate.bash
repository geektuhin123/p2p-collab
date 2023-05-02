#!/bin/bash

# Generate the JavaScript and TypeScript files from the proto file
./node_modules/.bin/grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./src/generated \
  --grpc_out=./src/generated \
  --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
  --ts_out=./src/generated \
  ./proto/spreadsheet.proto

# Rename the generated files to use camelCase instead of snake_case
for file in ./src/proto/*_pb.js; do mv "$file" "${file//_pb.js/_pb.js}"; done
for file in ./src/proto/*_grpc_pb.js; do mv "$file" "${file//_grpc_pb.js/_grpc_pb.js}"; done
