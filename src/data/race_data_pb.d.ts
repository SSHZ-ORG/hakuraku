// package: hakuraku
// file: race_data.proto

import * as jspb from "google-protobuf";

export class RaceSimulateData extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): RaceSimulateHeaderData | undefined;
  setHeader(value?: RaceSimulateHeaderData): void;

  hasDistanceDiffMax(): boolean;
  clearDistanceDiffMax(): void;
  getDistanceDiffMax(): number | undefined;
  setDistanceDiffMax(value: number): void;

  hasHorseNum(): boolean;
  clearHorseNum(): void;
  getHorseNum(): number | undefined;
  setHorseNum(value: number): void;

  hasHorseFrameSize(): boolean;
  clearHorseFrameSize(): void;
  getHorseFrameSize(): number | undefined;
  setHorseFrameSize(value: number): void;

  hasHorseResultSize(): boolean;
  clearHorseResultSize(): void;
  getHorseResultSize(): number | undefined;
  setHorseResultSize(value: number): void;

  hasPaddingSize1(): boolean;
  clearPaddingSize1(): void;
  getPaddingSize1(): number | undefined;
  setPaddingSize1(value: number): void;

  hasFrameCount(): boolean;
  clearFrameCount(): void;
  getFrameCount(): number | undefined;
  setFrameCount(value: number): void;

  hasFrameSize(): boolean;
  clearFrameSize(): void;
  getFrameSize(): number | undefined;
  setFrameSize(value: number): void;

  clearFrameList(): void;
  getFrameList(): Array<RaceSimulateFrameData>;
  setFrameList(value: Array<RaceSimulateFrameData>): void;
  addFrame(value?: RaceSimulateFrameData, index?: number): RaceSimulateFrameData;

  hasPaddingSize2(): boolean;
  clearPaddingSize2(): void;
  getPaddingSize2(): number | undefined;
  setPaddingSize2(value: number): void;

  clearHorseResultList(): void;
  getHorseResultList(): Array<RaceSimulateHorseResultData>;
  setHorseResultList(value: Array<RaceSimulateHorseResultData>): void;
  addHorseResult(value?: RaceSimulateHorseResultData, index?: number): RaceSimulateHorseResultData;

  hasPaddingSize3(): boolean;
  clearPaddingSize3(): void;
  getPaddingSize3(): number | undefined;
  setPaddingSize3(value: number): void;

  hasEventCount(): boolean;
  clearEventCount(): void;
  getEventCount(): number | undefined;
  setEventCount(value: number): void;

  clearEventList(): void;
  getEventList(): Array<RaceSimulateData.EventDataWrapper>;
  setEventList(value: Array<RaceSimulateData.EventDataWrapper>): void;
  addEvent(value?: RaceSimulateData.EventDataWrapper, index?: number): RaceSimulateData.EventDataWrapper;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RaceSimulateData.AsObject;
  static toObject(includeInstance: boolean, msg: RaceSimulateData): RaceSimulateData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RaceSimulateData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RaceSimulateData;
  static deserializeBinaryFromReader(message: RaceSimulateData, reader: jspb.BinaryReader): RaceSimulateData;
}

export namespace RaceSimulateData {
  export type AsObject = {
    header?: RaceSimulateHeaderData.AsObject,
    distanceDiffMax?: number,
    horseNum?: number,
    horseFrameSize?: number,
    horseResultSize?: number,
    PaddingSize1?: number,
    frameCount?: number,
    frameSize?: number,
    frameList: Array<RaceSimulateFrameData.AsObject>,
    PaddingSize2?: number,
    horseResultList: Array<RaceSimulateHorseResultData.AsObject>,
    PaddingSize3?: number,
    eventCount?: number,
    eventList: Array<RaceSimulateData.EventDataWrapper.AsObject>,
  }

  export class EventDataWrapper extends jspb.Message {
    hasEventSize(): boolean;
    clearEventSize(): void;
    getEventSize(): number | undefined;
    setEventSize(value: number): void;

    hasEvent(): boolean;
    clearEvent(): void;
    getEvent(): RaceSimulateEventData | undefined;
    setEvent(value?: RaceSimulateEventData): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventDataWrapper.AsObject;
    static toObject(includeInstance: boolean, msg: EventDataWrapper): EventDataWrapper.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventDataWrapper, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventDataWrapper;
    static deserializeBinaryFromReader(message: EventDataWrapper, reader: jspb.BinaryReader): EventDataWrapper;
  }

  export namespace EventDataWrapper {
    export type AsObject = {
      eventSize?: number,
      event?: RaceSimulateEventData.AsObject,
    }
  }
}

export class RaceSimulateHeaderData extends jspb.Message {
  hasMaxLength(): boolean;
  clearMaxLength(): void;
  getMaxLength(): number | undefined;
  setMaxLength(value: number): void;

  hasVersion(): boolean;
  clearVersion(): void;
  getVersion(): number | undefined;
  setVersion(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RaceSimulateHeaderData.AsObject;
  static toObject(includeInstance: boolean, msg: RaceSimulateHeaderData): RaceSimulateHeaderData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RaceSimulateHeaderData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RaceSimulateHeaderData;
  static deserializeBinaryFromReader(message: RaceSimulateHeaderData, reader: jspb.BinaryReader): RaceSimulateHeaderData;
}

export namespace RaceSimulateHeaderData {
  export type AsObject = {
    maxLength?: number,
    version?: number,
  }
}

export class RaceSimulateFrameData extends jspb.Message {
  hasTime(): boolean;
  clearTime(): void;
  getTime(): number | undefined;
  setTime(value: number): void;

  clearHorseFrameList(): void;
  getHorseFrameList(): Array<RaceSimulateHorseFrameData>;
  setHorseFrameList(value: Array<RaceSimulateHorseFrameData>): void;
  addHorseFrame(value?: RaceSimulateHorseFrameData, index?: number): RaceSimulateHorseFrameData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RaceSimulateFrameData.AsObject;
  static toObject(includeInstance: boolean, msg: RaceSimulateFrameData): RaceSimulateFrameData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RaceSimulateFrameData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RaceSimulateFrameData;
  static deserializeBinaryFromReader(message: RaceSimulateFrameData, reader: jspb.BinaryReader): RaceSimulateFrameData;
}

export namespace RaceSimulateFrameData {
  export type AsObject = {
    time?: number,
    horseFrameList: Array<RaceSimulateHorseFrameData.AsObject>,
  }
}

export class RaceSimulateHorseFrameData extends jspb.Message {
  hasDistance(): boolean;
  clearDistance(): void;
  getDistance(): number | undefined;
  setDistance(value: number): void;

  hasLanePosition(): boolean;
  clearLanePosition(): void;
  getLanePosition(): number | undefined;
  setLanePosition(value: number): void;

  hasSpeed(): boolean;
  clearSpeed(): void;
  getSpeed(): number | undefined;
  setSpeed(value: number): void;

  hasHp(): boolean;
  clearHp(): void;
  getHp(): number | undefined;
  setHp(value: number): void;

  hasTemptationMode(): boolean;
  clearTemptationMode(): void;
  getTemptationMode(): number | undefined;
  setTemptationMode(value: number): void;

  hasBlockFrontHorseIndex(): boolean;
  clearBlockFrontHorseIndex(): void;
  getBlockFrontHorseIndex(): number | undefined;
  setBlockFrontHorseIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RaceSimulateHorseFrameData.AsObject;
  static toObject(includeInstance: boolean, msg: RaceSimulateHorseFrameData): RaceSimulateHorseFrameData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RaceSimulateHorseFrameData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RaceSimulateHorseFrameData;
  static deserializeBinaryFromReader(message: RaceSimulateHorseFrameData, reader: jspb.BinaryReader): RaceSimulateHorseFrameData;
}

export namespace RaceSimulateHorseFrameData {
  export type AsObject = {
    distance?: number,
    lanePosition?: number,
    speed?: number,
    hp?: number,
    temptationMode?: number,
    blockFrontHorseIndex?: number,
  }
}

export class RaceSimulateHorseResultData extends jspb.Message {
  hasFinishOrder(): boolean;
  clearFinishOrder(): void;
  getFinishOrder(): number | undefined;
  setFinishOrder(value: number): void;

  hasFinishTime(): boolean;
  clearFinishTime(): void;
  getFinishTime(): number | undefined;
  setFinishTime(value: number): void;

  hasFinishDiffTime(): boolean;
  clearFinishDiffTime(): void;
  getFinishDiffTime(): number | undefined;
  setFinishDiffTime(value: number): void;

  hasStartDelayTime(): boolean;
  clearStartDelayTime(): void;
  getStartDelayTime(): number | undefined;
  setStartDelayTime(value: number): void;

  hasGutsOrder(): boolean;
  clearGutsOrder(): void;
  getGutsOrder(): number | undefined;
  setGutsOrder(value: number): void;

  hasWizOrder(): boolean;
  clearWizOrder(): void;
  getWizOrder(): number | undefined;
  setWizOrder(value: number): void;

  hasLastSpurtStartDistance(): boolean;
  clearLastSpurtStartDistance(): void;
  getLastSpurtStartDistance(): number | undefined;
  setLastSpurtStartDistance(value: number): void;

  hasRunningStyle(): boolean;
  clearRunningStyle(): void;
  getRunningStyle(): number | undefined;
  setRunningStyle(value: number): void;

  hasDefeat(): boolean;
  clearDefeat(): void;
  getDefeat(): number | undefined;
  setDefeat(value: number): void;

  hasFinishTimeRaw(): boolean;
  clearFinishTimeRaw(): void;
  getFinishTimeRaw(): number | undefined;
  setFinishTimeRaw(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RaceSimulateHorseResultData.AsObject;
  static toObject(includeInstance: boolean, msg: RaceSimulateHorseResultData): RaceSimulateHorseResultData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RaceSimulateHorseResultData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RaceSimulateHorseResultData;
  static deserializeBinaryFromReader(message: RaceSimulateHorseResultData, reader: jspb.BinaryReader): RaceSimulateHorseResultData;
}

export namespace RaceSimulateHorseResultData {
  export type AsObject = {
    finishOrder?: number,
    finishTime?: number,
    finishDiffTime?: number,
    startDelayTime?: number,
    gutsOrder?: number,
    wizOrder?: number,
    lastSpurtStartDistance?: number,
    runningStyle?: number,
    defeat?: number,
    finishTimeRaw?: number,
  }
}

export class RaceSimulateEventData extends jspb.Message {
  hasFrameTime(): boolean;
  clearFrameTime(): void;
  getFrameTime(): number | undefined;
  setFrameTime(value: number): void;

  hasType(): boolean;
  clearType(): void;
  getType(): RaceSimulateEventData.SimulateEventTypeMap[keyof RaceSimulateEventData.SimulateEventTypeMap] | undefined;
  setType(value: RaceSimulateEventData.SimulateEventTypeMap[keyof RaceSimulateEventData.SimulateEventTypeMap]): void;

  hasParamCount(): boolean;
  clearParamCount(): void;
  getParamCount(): number | undefined;
  setParamCount(value: number): void;

  clearParamList(): void;
  getParamList(): Array<number>;
  setParamList(value: Array<number>): void;
  addParam(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RaceSimulateEventData.AsObject;
  static toObject(includeInstance: boolean, msg: RaceSimulateEventData): RaceSimulateEventData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RaceSimulateEventData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RaceSimulateEventData;
  static deserializeBinaryFromReader(message: RaceSimulateEventData, reader: jspb.BinaryReader): RaceSimulateEventData;
}

export namespace RaceSimulateEventData {
  export type AsObject = {
    frameTime?: number,
    type?: RaceSimulateEventData.SimulateEventTypeMap[keyof RaceSimulateEventData.SimulateEventTypeMap],
    paramCount?: number,
    paramList: Array<number>,
  }

  export interface SimulateEventTypeMap {
    SCORE: 0;
    CHALLENGE_MATCH_POINT: 1;
    NOUSE_2: 2;
    SKILL: 3;
    COMPETE_TOP: 4;
    COMPETE_FIGHT: 5;
  }

  export const SimulateEventType: SimulateEventTypeMap;
}

