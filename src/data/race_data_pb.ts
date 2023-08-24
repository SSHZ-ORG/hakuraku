// @generated by protoc-gen-es v1.0.0 with parameter "target=ts"
// @generated from file race_data.proto (package hakuraku, syntax proto2)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from message hakuraku.RaceSimulateData
 */
export class RaceSimulateData extends Message<RaceSimulateData> {
  /**
   * @generated from field: optional hakuraku.RaceSimulateHeaderData header = 1;
   */
  header?: RaceSimulateHeaderData;

  /**
   * @generated from field: optional float distance_diff_max = 2;
   */
  distanceDiffMax?: number;

  /**
   * @generated from field: optional int32 horse_num = 3;
   */
  horseNum?: number;

  /**
   * @generated from field: optional int32 horse_frame_size = 4;
   */
  horseFrameSize?: number;

  /**
   * @generated from field: optional int32 horse_result_size = 5;
   */
  horseResultSize?: number;

  /**
   * @generated from field: optional int32 __padding_size_1 = 6;
   */
  PaddingSize1?: number;

  /**
   * @generated from field: optional int32 frame_count = 7;
   */
  frameCount?: number;

  /**
   * @generated from field: optional int32 frame_size = 8;
   */
  frameSize?: number;

  /**
   * @generated from field: repeated hakuraku.RaceSimulateFrameData frame = 9;
   */
  frame: RaceSimulateFrameData[] = [];

  /**
   * @generated from field: optional int32 __padding_size_2 = 10;
   */
  PaddingSize2?: number;

  /**
   * @generated from field: repeated hakuraku.RaceSimulateHorseResultData horse_result = 11;
   */
  horseResult: RaceSimulateHorseResultData[] = [];

  /**
   * @generated from field: optional int32 __padding_size_3 = 12;
   */
  PaddingSize3?: number;

  /**
   * @generated from field: optional int32 event_count = 13;
   */
  eventCount?: number;

  /**
   * @generated from field: repeated hakuraku.RaceSimulateData.EventDataWrapper event = 14;
   */
  event: RaceSimulateData_EventDataWrapper[] = [];

  constructor(data?: PartialMessage<RaceSimulateData>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.RaceSimulateData";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "header", kind: "message", T: RaceSimulateHeaderData, opt: true },
    { no: 2, name: "distance_diff_max", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
    { no: 3, name: "horse_num", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 4, name: "horse_frame_size", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 5, name: "horse_result_size", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 6, name: "__padding_size_1", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 7, name: "frame_count", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 8, name: "frame_size", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 9, name: "frame", kind: "message", T: RaceSimulateFrameData, repeated: true },
    { no: 10, name: "__padding_size_2", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 11, name: "horse_result", kind: "message", T: RaceSimulateHorseResultData, repeated: true },
    { no: 12, name: "__padding_size_3", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 13, name: "event_count", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 14, name: "event", kind: "message", T: RaceSimulateData_EventDataWrapper, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceSimulateData {
    return new RaceSimulateData().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceSimulateData {
    return new RaceSimulateData().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceSimulateData {
    return new RaceSimulateData().fromJsonString(jsonString, options);
  }

  static equals(a: RaceSimulateData | PlainMessage<RaceSimulateData> | undefined, b: RaceSimulateData | PlainMessage<RaceSimulateData> | undefined): boolean {
    return proto2.util.equals(RaceSimulateData, a, b);
  }
}

/**
 * @generated from message hakuraku.RaceSimulateData.EventDataWrapper
 */
export class RaceSimulateData_EventDataWrapper extends Message<RaceSimulateData_EventDataWrapper> {
  /**
   * int16
   *
   * @generated from field: optional int32 event_size = 1;
   */
  eventSize?: number;

  /**
   * @generated from field: optional hakuraku.RaceSimulateEventData event = 2;
   */
  event?: RaceSimulateEventData;

  constructor(data?: PartialMessage<RaceSimulateData_EventDataWrapper>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.RaceSimulateData.EventDataWrapper";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "event_size", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "event", kind: "message", T: RaceSimulateEventData, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceSimulateData_EventDataWrapper {
    return new RaceSimulateData_EventDataWrapper().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceSimulateData_EventDataWrapper {
    return new RaceSimulateData_EventDataWrapper().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceSimulateData_EventDataWrapper {
    return new RaceSimulateData_EventDataWrapper().fromJsonString(jsonString, options);
  }

  static equals(a: RaceSimulateData_EventDataWrapper | PlainMessage<RaceSimulateData_EventDataWrapper> | undefined, b: RaceSimulateData_EventDataWrapper | PlainMessage<RaceSimulateData_EventDataWrapper> | undefined): boolean {
    return proto2.util.equals(RaceSimulateData_EventDataWrapper, a, b);
  }
}

/**
 * @generated from message hakuraku.RaceSimulateHeaderData
 */
export class RaceSimulateHeaderData extends Message<RaceSimulateHeaderData> {
  /**
   * @generated from field: optional int32 max_length = 1;
   */
  maxLength?: number;

  /**
   * @generated from field: optional int32 version = 2;
   */
  version?: number;

  constructor(data?: PartialMessage<RaceSimulateHeaderData>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.RaceSimulateHeaderData";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "max_length", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "version", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceSimulateHeaderData {
    return new RaceSimulateHeaderData().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceSimulateHeaderData {
    return new RaceSimulateHeaderData().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceSimulateHeaderData {
    return new RaceSimulateHeaderData().fromJsonString(jsonString, options);
  }

  static equals(a: RaceSimulateHeaderData | PlainMessage<RaceSimulateHeaderData> | undefined, b: RaceSimulateHeaderData | PlainMessage<RaceSimulateHeaderData> | undefined): boolean {
    return proto2.util.equals(RaceSimulateHeaderData, a, b);
  }
}

/**
 * @generated from message hakuraku.RaceSimulateFrameData
 */
export class RaceSimulateFrameData extends Message<RaceSimulateFrameData> {
  /**
   * @generated from field: optional float time = 1;
   */
  time?: number;

  /**
   * @generated from field: repeated hakuraku.RaceSimulateHorseFrameData horse_frame = 2;
   */
  horseFrame: RaceSimulateHorseFrameData[] = [];

  constructor(data?: PartialMessage<RaceSimulateFrameData>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.RaceSimulateFrameData";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "time", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
    { no: 2, name: "horse_frame", kind: "message", T: RaceSimulateHorseFrameData, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceSimulateFrameData {
    return new RaceSimulateFrameData().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceSimulateFrameData {
    return new RaceSimulateFrameData().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceSimulateFrameData {
    return new RaceSimulateFrameData().fromJsonString(jsonString, options);
  }

  static equals(a: RaceSimulateFrameData | PlainMessage<RaceSimulateFrameData> | undefined, b: RaceSimulateFrameData | PlainMessage<RaceSimulateFrameData> | undefined): boolean {
    return proto2.util.equals(RaceSimulateFrameData, a, b);
  }
}

/**
 * @generated from message hakuraku.RaceSimulateHorseFrameData
 */
export class RaceSimulateHorseFrameData extends Message<RaceSimulateHorseFrameData> {
  /**
   * @generated from field: optional float distance = 1;
   */
  distance?: number;

  /**
   * uint16
   *
   * @generated from field: optional uint32 lane_position = 2;
   */
  lanePosition?: number;

  /**
   * uint16
   *
   * @generated from field: optional uint32 speed = 3;
   */
  speed?: number;

  /**
   * uint16
   *
   * @generated from field: optional uint32 hp = 4;
   */
  hp?: number;

  /**
   * sbyte
   *
   * @generated from field: optional hakuraku.RaceSimulateHorseFrameData.TemptationMode temptation_mode = 5;
   */
  temptationMode?: RaceSimulateHorseFrameData_TemptationMode;

  /**
   * sbyte
   *
   * @generated from field: optional int32 block_front_horse_index = 6;
   */
  blockFrontHorseIndex?: number;

  constructor(data?: PartialMessage<RaceSimulateHorseFrameData>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.RaceSimulateHorseFrameData";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "distance", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
    { no: 2, name: "lane_position", kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
    { no: 3, name: "speed", kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
    { no: 4, name: "hp", kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
    { no: 5, name: "temptation_mode", kind: "enum", T: proto2.getEnumType(RaceSimulateHorseFrameData_TemptationMode), opt: true },
    { no: 6, name: "block_front_horse_index", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceSimulateHorseFrameData {
    return new RaceSimulateHorseFrameData().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceSimulateHorseFrameData {
    return new RaceSimulateHorseFrameData().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceSimulateHorseFrameData {
    return new RaceSimulateHorseFrameData().fromJsonString(jsonString, options);
  }

  static equals(a: RaceSimulateHorseFrameData | PlainMessage<RaceSimulateHorseFrameData> | undefined, b: RaceSimulateHorseFrameData | PlainMessage<RaceSimulateHorseFrameData> | undefined): boolean {
    return proto2.util.equals(RaceSimulateHorseFrameData, a, b);
  }
}

/**
 * enum HorseTemptationCalculator.TemptationMode
 *
 * @generated from enum hakuraku.RaceSimulateHorseFrameData.TemptationMode
 */
export enum RaceSimulateHorseFrameData_TemptationMode {
  /**
   * @generated from enum value: NULL = 0;
   */
  NULL = 0,

  /**
   * @generated from enum value: POSITION_SASHI = 1;
   */
  POSITION_SASHI = 1,

  /**
   * @generated from enum value: POSITION_SENKO = 2;
   */
  POSITION_SENKO = 2,

  /**
   * @generated from enum value: POSITION_NIGE = 3;
   */
  POSITION_NIGE = 3,

  /**
   * @generated from enum value: BOOST = 4;
   */
  BOOST = 4,
}
// Retrieve enum metadata with: proto2.getEnumType(RaceSimulateHorseFrameData_TemptationMode)
proto2.util.setEnumType(RaceSimulateHorseFrameData_TemptationMode, "hakuraku.RaceSimulateHorseFrameData.TemptationMode", [
  { no: 0, name: "NULL" },
  { no: 1, name: "POSITION_SASHI" },
  { no: 2, name: "POSITION_SENKO" },
  { no: 3, name: "POSITION_NIGE" },
  { no: 4, name: "BOOST" },
]);

/**
 * @generated from message hakuraku.RaceSimulateHorseResultData
 */
export class RaceSimulateHorseResultData extends Message<RaceSimulateHorseResultData> {
  /**
   * @generated from field: optional int32 finish_order = 1;
   */
  finishOrder?: number;

  /**
   * @generated from field: optional float finish_time = 2;
   */
  finishTime?: number;

  /**
   * @generated from field: optional float finish_diff_time = 3;
   */
  finishDiffTime?: number;

  /**
   * @generated from field: optional float start_delay_time = 4;
   */
  startDelayTime?: number;

  /**
   * byte
   *
   * @generated from field: optional uint32 guts_order = 5;
   */
  gutsOrder?: number;

  /**
   * byte
   *
   * @generated from field: optional uint32 wiz_order = 6;
   */
  wizOrder?: number;

  /**
   * @generated from field: optional float last_spurt_start_distance = 7;
   */
  lastSpurtStartDistance?: number;

  /**
   * byte
   *
   * @generated from field: optional hakuraku.RaceSimulateHorseResultData.RunningStyle running_style = 8;
   */
  runningStyle?: RaceSimulateHorseResultData_RunningStyle;

  /**
   * enum RaceDefine.DefeatType
   *
   * @generated from field: optional int32 defeat = 9;
   */
  defeat?: number;

  /**
   * @generated from field: optional float finish_time_raw = 10;
   */
  finishTimeRaw?: number;

  constructor(data?: PartialMessage<RaceSimulateHorseResultData>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.RaceSimulateHorseResultData";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "finish_order", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "finish_time", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
    { no: 3, name: "finish_diff_time", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
    { no: 4, name: "start_delay_time", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
    { no: 5, name: "guts_order", kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
    { no: 6, name: "wiz_order", kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
    { no: 7, name: "last_spurt_start_distance", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
    { no: 8, name: "running_style", kind: "enum", T: proto2.getEnumType(RaceSimulateHorseResultData_RunningStyle), opt: true },
    { no: 9, name: "defeat", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 10, name: "finish_time_raw", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceSimulateHorseResultData {
    return new RaceSimulateHorseResultData().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceSimulateHorseResultData {
    return new RaceSimulateHorseResultData().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceSimulateHorseResultData {
    return new RaceSimulateHorseResultData().fromJsonString(jsonString, options);
  }

  static equals(a: RaceSimulateHorseResultData | PlainMessage<RaceSimulateHorseResultData> | undefined, b: RaceSimulateHorseResultData | PlainMessage<RaceSimulateHorseResultData> | undefined): boolean {
    return proto2.util.equals(RaceSimulateHorseResultData, a, b);
  }
}

/**
 * enum RaceDefine.RunningStyle
 *
 * @generated from enum hakuraku.RaceSimulateHorseResultData.RunningStyle
 */
export enum RaceSimulateHorseResultData_RunningStyle {
  /**
   * @generated from enum value: NONE = 0;
   */
  NONE = 0,

  /**
   * @generated from enum value: NIGE = 1;
   */
  NIGE = 1,

  /**
   * @generated from enum value: SENKO = 2;
   */
  SENKO = 2,

  /**
   * @generated from enum value: SASHI = 3;
   */
  SASHI = 3,

  /**
   * @generated from enum value: OIKOMI = 4;
   */
  OIKOMI = 4,
}
// Retrieve enum metadata with: proto2.getEnumType(RaceSimulateHorseResultData_RunningStyle)
proto2.util.setEnumType(RaceSimulateHorseResultData_RunningStyle, "hakuraku.RaceSimulateHorseResultData.RunningStyle", [
  { no: 0, name: "NONE" },
  { no: 1, name: "NIGE" },
  { no: 2, name: "SENKO" },
  { no: 3, name: "SASHI" },
  { no: 4, name: "OIKOMI" },
]);

/**
 * @generated from message hakuraku.RaceSimulateEventData
 */
export class RaceSimulateEventData extends Message<RaceSimulateEventData> {
  /**
   * @generated from field: optional float frame_time = 1;
   */
  frameTime?: number;

  /**
   * byte
   *
   * @generated from field: optional hakuraku.RaceSimulateEventData.SimulateEventType type = 2;
   */
  type?: RaceSimulateEventData_SimulateEventType;

  /**
   * byte
   *
   * @generated from field: optional uint32 param_count = 3;
   */
  paramCount?: number;

  /**
   * @generated from field: repeated int32 param = 4;
   */
  param: number[] = [];

  constructor(data?: PartialMessage<RaceSimulateEventData>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.RaceSimulateEventData";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "frame_time", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
    { no: 2, name: "type", kind: "enum", T: proto2.getEnumType(RaceSimulateEventData_SimulateEventType), opt: true },
    { no: 3, name: "param_count", kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
    { no: 4, name: "param", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceSimulateEventData {
    return new RaceSimulateEventData().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceSimulateEventData {
    return new RaceSimulateEventData().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceSimulateEventData {
    return new RaceSimulateEventData().fromJsonString(jsonString, options);
  }

  static equals(a: RaceSimulateEventData | PlainMessage<RaceSimulateEventData> | undefined, b: RaceSimulateEventData | PlainMessage<RaceSimulateEventData> | undefined): boolean {
    return proto2.util.equals(RaceSimulateEventData, a, b);
  }
}

/**
 * enum SimulateEventType
 *
 * @generated from enum hakuraku.RaceSimulateEventData.SimulateEventType
 */
export enum RaceSimulateEventData_SimulateEventType {
  /**
   * Original format uses 0 - it's NOT unspecified!
   *
   * @generated from enum value: SCORE = 0;
   */
  SCORE = 0,

  /**
   * @generated from enum value: CHALLENGE_MATCH_POINT = 1;
   */
  CHALLENGE_MATCH_POINT = 1,

  /**
   * @generated from enum value: NOUSE_2 = 2;
   */
  NOUSE_2 = 2,

  /**
   * @generated from enum value: SKILL = 3;
   */
  SKILL = 3,

  /**
   * @generated from enum value: COMPETE_TOP = 4;
   */
  COMPETE_TOP = 4,

  /**
   * @generated from enum value: COMPETE_FIGHT = 5;
   */
  COMPETE_FIGHT = 5,

  /**
   * @generated from enum value: RELEASE_CONSERVE_POWER = 6;
   */
  RELEASE_CONSERVE_POWER = 6,

  /**
   * @generated from enum value: STAMINA_LIMIT_BREAK_BUFF = 7;
   */
  STAMINA_LIMIT_BREAK_BUFF = 7,

  /**
   * @generated from enum value: COMPETE_BEFORE_SPURT = 8;
   */
  COMPETE_BEFORE_SPURT = 8,

  /**
   * @generated from enum value: STAMINA_KEEP = 9;
   */
  STAMINA_KEEP = 9,

  /**
   * @generated from enum value: SECURE_LEAD = 10;
   */
  SECURE_LEAD = 10,
}
// Retrieve enum metadata with: proto2.getEnumType(RaceSimulateEventData_SimulateEventType)
proto2.util.setEnumType(RaceSimulateEventData_SimulateEventType, "hakuraku.RaceSimulateEventData.SimulateEventType", [
  { no: 0, name: "SCORE" },
  { no: 1, name: "CHALLENGE_MATCH_POINT" },
  { no: 2, name: "NOUSE_2" },
  { no: 3, name: "SKILL" },
  { no: 4, name: "COMPETE_TOP" },
  { no: 5, name: "COMPETE_FIGHT" },
  { no: 6, name: "RELEASE_CONSERVE_POWER" },
  { no: 7, name: "STAMINA_LIMIT_BREAK_BUFF" },
  { no: 8, name: "COMPETE_BEFORE_SPURT" },
  { no: 9, name: "STAMINA_KEEP" },
  { no: 10, name: "SECURE_LEAD" },
]);

