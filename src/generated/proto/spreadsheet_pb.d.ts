// package: spreadsheet
// file: proto/spreadsheet.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Cell extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  hasLocation(): boolean;
  clearLocation(): void;
  getLocation(): Location | undefined;
  setLocation(value?: Location): void;

  getLocked(): boolean;
  setLocked(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearCollaboratorsList(): void;
  getCollaboratorsList(): Array<Collaborator>;
  setCollaboratorsList(value: Array<Collaborator>): void;
  addCollaborators(value?: Collaborator, index?: number): Collaborator;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Cell.AsObject;
  static toObject(includeInstance: boolean, msg: Cell): Cell.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Cell, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Cell;
  static deserializeBinaryFromReader(message: Cell, reader: jspb.BinaryReader): Cell;
}

export namespace Cell {
  export type AsObject = {
    id: string,
    value: string,
    location?: Location.AsObject,
    locked: boolean,
    error: string,
    collaboratorsList: Array<Collaborator.AsObject>,
  }
}

export class Collaborator extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Collaborator.AsObject;
  static toObject(includeInstance: boolean, msg: Collaborator): Collaborator.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Collaborator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Collaborator;
  static deserializeBinaryFromReader(message: Collaborator, reader: jspb.BinaryReader): Collaborator;
}

export namespace Collaborator {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class Location extends jspb.Message {
  getRow(): number;
  setRow(value: number): void;

  getColumn(): number;
  setColumn(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Location.AsObject;
  static toObject(includeInstance: boolean, msg: Location): Location.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Location, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Location;
  static deserializeBinaryFromReader(message: Location, reader: jspb.BinaryReader): Location;
}

export namespace Location {
  export type AsObject = {
    row: number,
    column: number,
  }
}

