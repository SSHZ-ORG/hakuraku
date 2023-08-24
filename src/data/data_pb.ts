// @generated by protoc-gen-es v1.0.0 with parameter "target=ts"
// @generated from file data.proto (package hakuraku, syntax proto2)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from message hakuraku.UMDatabase
 */
export class UMDatabase extends Message<UMDatabase> {
  /**
   * @generated from field: optional string version = 1;
   */
  version?: string;

  /**
   * @generated from field: repeated hakuraku.Chara chara = 2;
   */
  chara: Chara[] = [];

  /**
   * @generated from field: repeated hakuraku.Card card = 9;
   */
  card: Card[] = [];

  /**
   * @generated from field: repeated hakuraku.SupportCard support_card = 11;
   */
  supportCard: SupportCard[] = [];

  /**
   * @generated from field: repeated hakuraku.SuccessionRelation succession_relation = 3;
   */
  successionRelation: SuccessionRelation[] = [];

  /**
   * @generated from field: repeated hakuraku.RaceInstance race_instance = 4;
   */
  raceInstance: RaceInstance[] = [];

  /**
   * @generated from field: repeated hakuraku.WinsSaddle wins_saddle = 5;
   */
  winsSaddle: WinsSaddle[] = [];

  /**
   * @generated from field: repeated hakuraku.SpecialCaseRace special_case_race = 6;
   */
  specialCaseRace: SpecialCaseRace[] = [];

  /**
   * @generated from field: repeated hakuraku.Skill skill = 7;
   */
  skill: Skill[] = [];

  /**
   * @generated from field: repeated hakuraku.TeamStadiumScoreBonus team_stadium_score_bonus = 8;
   */
  teamStadiumScoreBonus: TeamStadiumScoreBonus[] = [];

  /**
   * @generated from field: repeated hakuraku.Story story = 10;
   */
  story: Story[] = [];

  constructor(data?: PartialMessage<UMDatabase>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.UMDatabase";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "version", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 2, name: "chara", kind: "message", T: Chara, repeated: true },
    { no: 9, name: "card", kind: "message", T: Card, repeated: true },
    { no: 11, name: "support_card", kind: "message", T: SupportCard, repeated: true },
    { no: 3, name: "succession_relation", kind: "message", T: SuccessionRelation, repeated: true },
    { no: 4, name: "race_instance", kind: "message", T: RaceInstance, repeated: true },
    { no: 5, name: "wins_saddle", kind: "message", T: WinsSaddle, repeated: true },
    { no: 6, name: "special_case_race", kind: "message", T: SpecialCaseRace, repeated: true },
    { no: 7, name: "skill", kind: "message", T: Skill, repeated: true },
    { no: 8, name: "team_stadium_score_bonus", kind: "message", T: TeamStadiumScoreBonus, repeated: true },
    { no: 10, name: "story", kind: "message", T: Story, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UMDatabase {
    return new UMDatabase().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UMDatabase {
    return new UMDatabase().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UMDatabase {
    return new UMDatabase().fromJsonString(jsonString, options);
  }

  static equals(a: UMDatabase | PlainMessage<UMDatabase> | undefined, b: UMDatabase | PlainMessage<UMDatabase> | undefined): boolean {
    return proto2.util.equals(UMDatabase, a, b);
  }
}

/**
 * @generated from message hakuraku.Chara
 */
export class Chara extends Message<Chara> {
  /**
   * @generated from field: optional int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: optional string name = 2;
   */
  name?: string;

  /**
   * @generated from field: optional string cast_name = 3;
   */
  castName?: string;

  constructor(data?: PartialMessage<Chara>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.Chara";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 3, name: "cast_name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Chara {
    return new Chara().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Chara {
    return new Chara().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Chara {
    return new Chara().fromJsonString(jsonString, options);
  }

  static equals(a: Chara | PlainMessage<Chara> | undefined, b: Chara | PlainMessage<Chara> | undefined): boolean {
    return proto2.util.equals(Chara, a, b);
  }
}

/**
 * @generated from message hakuraku.Card
 */
export class Card extends Message<Card> {
  /**
   * @generated from field: optional int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: optional string name = 2;
   */
  name?: string;

  constructor(data?: PartialMessage<Card>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.Card";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Card {
    return new Card().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Card {
    return new Card().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Card {
    return new Card().fromJsonString(jsonString, options);
  }

  static equals(a: Card | PlainMessage<Card> | undefined, b: Card | PlainMessage<Card> | undefined): boolean {
    return proto2.util.equals(Card, a, b);
  }
}

/**
 * @generated from message hakuraku.SupportCard
 */
export class SupportCard extends Message<SupportCard> {
  /**
   * @generated from field: optional int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: optional string name = 2;
   */
  name?: string;

  /**
   * @generated from field: optional int32 chara_id = 3;
   */
  charaId?: number;

  constructor(data?: PartialMessage<SupportCard>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.SupportCard";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 3, name: "chara_id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SupportCard {
    return new SupportCard().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SupportCard {
    return new SupportCard().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SupportCard {
    return new SupportCard().fromJsonString(jsonString, options);
  }

  static equals(a: SupportCard | PlainMessage<SupportCard> | undefined, b: SupportCard | PlainMessage<SupportCard> | undefined): boolean {
    return proto2.util.equals(SupportCard, a, b);
  }
}

/**
 * @generated from message hakuraku.SuccessionRelation
 */
export class SuccessionRelation extends Message<SuccessionRelation> {
  /**
   * @generated from field: optional int32 relation_type = 1;
   */
  relationType?: number;

  /**
   * @generated from field: optional int32 relation_point = 2;
   */
  relationPoint?: number;

  /**
   * @generated from field: repeated hakuraku.SuccessionRelation.Member member = 3;
   */
  member: SuccessionRelation_Member[] = [];

  constructor(data?: PartialMessage<SuccessionRelation>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.SuccessionRelation";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "relation_type", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "relation_point", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 3, name: "member", kind: "message", T: SuccessionRelation_Member, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SuccessionRelation {
    return new SuccessionRelation().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SuccessionRelation {
    return new SuccessionRelation().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SuccessionRelation {
    return new SuccessionRelation().fromJsonString(jsonString, options);
  }

  static equals(a: SuccessionRelation | PlainMessage<SuccessionRelation> | undefined, b: SuccessionRelation | PlainMessage<SuccessionRelation> | undefined): boolean {
    return proto2.util.equals(SuccessionRelation, a, b);
  }
}

/**
 * @generated from message hakuraku.SuccessionRelation.Member
 */
export class SuccessionRelation_Member extends Message<SuccessionRelation_Member> {
  /**
   * @generated from field: optional int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: optional int32 chara_id = 2;
   */
  charaId?: number;

  constructor(data?: PartialMessage<SuccessionRelation_Member>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.SuccessionRelation.Member";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "chara_id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SuccessionRelation_Member {
    return new SuccessionRelation_Member().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SuccessionRelation_Member {
    return new SuccessionRelation_Member().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SuccessionRelation_Member {
    return new SuccessionRelation_Member().fromJsonString(jsonString, options);
  }

  static equals(a: SuccessionRelation_Member | PlainMessage<SuccessionRelation_Member> | undefined, b: SuccessionRelation_Member | PlainMessage<SuccessionRelation_Member> | undefined): boolean {
    return proto2.util.equals(SuccessionRelation_Member, a, b);
  }
}

/**
 * @generated from message hakuraku.RaceInstance
 */
export class RaceInstance extends Message<RaceInstance> {
  /**
   * @generated from field: optional int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: optional string name = 2;
   */
  name?: string;

  /**
   * @generated from field: optional int32 distance = 3;
   */
  distance?: number;

  /**
   * @generated from field: optional hakuraku.RaceInstance.GroundType ground_type = 4;
   */
  groundType?: RaceInstance_GroundType;

  constructor(data?: PartialMessage<RaceInstance>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.RaceInstance";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 3, name: "distance", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 4, name: "ground_type", kind: "enum", T: proto2.getEnumType(RaceInstance_GroundType), opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceInstance {
    return new RaceInstance().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceInstance {
    return new RaceInstance().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceInstance {
    return new RaceInstance().fromJsonString(jsonString, options);
  }

  static equals(a: RaceInstance | PlainMessage<RaceInstance> | undefined, b: RaceInstance | PlainMessage<RaceInstance> | undefined): boolean {
    return proto2.util.equals(RaceInstance, a, b);
  }
}

/**
 * @generated from enum hakuraku.RaceInstance.GroundType
 */
export enum RaceInstance_GroundType {
  /**
   * @generated from enum value: UNKNOWN_GROUND_TYPE = 0;
   */
  UNKNOWN_GROUND_TYPE = 0,

  /**
   * @generated from enum value: TURF = 1;
   */
  TURF = 1,

  /**
   * @generated from enum value: DIRT = 2;
   */
  DIRT = 2,
}
// Retrieve enum metadata with: proto2.getEnumType(RaceInstance_GroundType)
proto2.util.setEnumType(RaceInstance_GroundType, "hakuraku.RaceInstance.GroundType", [
  { no: 0, name: "UNKNOWN_GROUND_TYPE" },
  { no: 1, name: "TURF" },
  { no: 2, name: "DIRT" },
]);

/**
 * @generated from message hakuraku.WinsSaddle
 */
export class WinsSaddle extends Message<WinsSaddle> {
  /**
   * @generated from field: optional int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: optional string name = 2;
   */
  name?: string;

  /**
   * @generated from field: repeated int32 race_instance_id = 3;
   */
  raceInstanceId: number[] = [];

  /**
   * @generated from field: optional int32 priority = 4;
   */
  priority?: number;

  /**
   * @generated from field: optional int32 group_id = 5;
   */
  groupId?: number;

  /**
   * @generated from field: optional hakuraku.WinsSaddle.WinSaddleType type = 6;
   */
  type?: WinsSaddle_WinSaddleType;

  constructor(data?: PartialMessage<WinsSaddle>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.WinsSaddle";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 3, name: "race_instance_id", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
    { no: 4, name: "priority", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 5, name: "group_id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 6, name: "type", kind: "enum", T: proto2.getEnumType(WinsSaddle_WinSaddleType), opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): WinsSaddle {
    return new WinsSaddle().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): WinsSaddle {
    return new WinsSaddle().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): WinsSaddle {
    return new WinsSaddle().fromJsonString(jsonString, options);
  }

  static equals(a: WinsSaddle | PlainMessage<WinsSaddle> | undefined, b: WinsSaddle | PlainMessage<WinsSaddle> | undefined): boolean {
    return proto2.util.equals(WinsSaddle, a, b);
  }
}

/**
 * enum SingleModeDefine.WinSaddleType
 *
 * @generated from enum hakuraku.WinsSaddle.WinSaddleType
 */
export enum WinsSaddle_WinSaddleType {
  /**
   * @generated from enum value: SPECIAL = 0;
   */
  SPECIAL = 0,

  /**
   * @generated from enum value: G3 = 1;
   */
  G3 = 1,

  /**
   * @generated from enum value: G2 = 2;
   */
  G2 = 2,

  /**
   * @generated from enum value: G1 = 3;
   */
  G1 = 3,
}
// Retrieve enum metadata with: proto2.getEnumType(WinsSaddle_WinSaddleType)
proto2.util.setEnumType(WinsSaddle_WinSaddleType, "hakuraku.WinsSaddle.WinSaddleType", [
  { no: 0, name: "SPECIAL" },
  { no: 1, name: "G3" },
  { no: 2, name: "G2" },
  { no: 3, name: "G1" },
]);

/**
 * @generated from message hakuraku.SpecialCaseRace
 */
export class SpecialCaseRace extends Message<SpecialCaseRace> {
  /**
   * @generated from field: optional int32 race_instance_id = 1;
   */
  raceInstanceId?: number;

  /**
   * @generated from field: optional int32 program_group = 2;
   */
  programGroup?: number;

  /**
   * @generated from field: optional hakuraku.SpecialCaseRace.RacePermission race_permission = 3;
   */
  racePermission?: SpecialCaseRace_RacePermission;

  /**
   * This shouldn't belong here. But it's anyway temporary.
   *
   * @generated from field: repeated int32 chara_id = 4;
   */
  charaId: number[] = [];

  constructor(data?: PartialMessage<SpecialCaseRace>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.SpecialCaseRace";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "race_instance_id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "program_group", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 3, name: "race_permission", kind: "enum", T: proto2.getEnumType(SpecialCaseRace_RacePermission), opt: true },
    { no: 4, name: "chara_id", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SpecialCaseRace {
    return new SpecialCaseRace().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SpecialCaseRace {
    return new SpecialCaseRace().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SpecialCaseRace {
    return new SpecialCaseRace().fromJsonString(jsonString, options);
  }

  static equals(a: SpecialCaseRace | PlainMessage<SpecialCaseRace> | undefined, b: SpecialCaseRace | PlainMessage<SpecialCaseRace> | undefined): boolean {
    return proto2.util.equals(SpecialCaseRace, a, b);
  }
}

/**
 * enum SingleModeDefine.RacePermissionType
 *
 * @generated from enum hakuraku.SpecialCaseRace.RacePermission
 */
export enum SpecialCaseRace_RacePermission {
  /**
   * @generated from enum value: UNKNOWN_RACE_PERMISSION = 0;
   */
  UNKNOWN_RACE_PERMISSION = 0,

  /**
   * @generated from enum value: JUNIOR_ONLY = 1;
   */
  JUNIOR_ONLY = 1,

  /**
   * @generated from enum value: CLASSIC_ONLY = 2;
   */
  CLASSIC_ONLY = 2,

  /**
   * @generated from enum value: CLASSIC_AFTER = 3;
   */
  CLASSIC_AFTER = 3,

  /**
   * @generated from enum value: SENIOR_AFTER = 4;
   */
  SENIOR_AFTER = 4,

  /**
   * @generated from enum value: ORIGINAL = 5;
   */
  ORIGINAL = 5,

  /**
   * @generated from enum value: HIDE_CLASSIC_AFTER = 6;
   */
  HIDE_CLASSIC_AFTER = 6,

  /**
   * @generated from enum value: CLASSIC_ONLY_SENIOR = 7;
   */
  CLASSIC_ONLY_SENIOR = 7,

  /**
   * @generated from enum value: SENIOR_AFTER_CLASSIC = 8;
   */
  SENIOR_AFTER_CLASSIC = 8,
}
// Retrieve enum metadata with: proto2.getEnumType(SpecialCaseRace_RacePermission)
proto2.util.setEnumType(SpecialCaseRace_RacePermission, "hakuraku.SpecialCaseRace.RacePermission", [
  { no: 0, name: "UNKNOWN_RACE_PERMISSION" },
  { no: 1, name: "JUNIOR_ONLY" },
  { no: 2, name: "CLASSIC_ONLY" },
  { no: 3, name: "CLASSIC_AFTER" },
  { no: 4, name: "SENIOR_AFTER" },
  { no: 5, name: "ORIGINAL" },
  { no: 6, name: "HIDE_CLASSIC_AFTER" },
  { no: 7, name: "CLASSIC_ONLY_SENIOR" },
  { no: 8, name: "SENIOR_AFTER_CLASSIC" },
]);

/**
 * @generated from message hakuraku.Skill
 */
export class Skill extends Message<Skill> {
  /**
   * @generated from field: optional int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: optional string name = 2;
   */
  name?: string;

  /**
   * @generated from field: optional sint32 grade_value = 3;
   */
  gradeValue?: number;

  /**
   * Known tags:
   * 10[1-4]: running style restricted
   * 20[1-4]: distance type restricted
   *
   * @generated from field: repeated string tag_id = 4;
   */
  tagId: string[] = [];

  constructor(data?: PartialMessage<Skill>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.Skill";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 3, name: "grade_value", kind: "scalar", T: 17 /* ScalarType.SINT32 */, opt: true },
    { no: 4, name: "tag_id", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Skill {
    return new Skill().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Skill {
    return new Skill().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Skill {
    return new Skill().fromJsonString(jsonString, options);
  }

  static equals(a: Skill | PlainMessage<Skill> | undefined, b: Skill | PlainMessage<Skill> | undefined): boolean {
    return proto2.util.equals(Skill, a, b);
  }
}

/**
 * @generated from message hakuraku.TeamStadiumScoreBonus
 */
export class TeamStadiumScoreBonus extends Message<TeamStadiumScoreBonus> {
  /**
   * @generated from field: optional int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: optional string name = 2;
   */
  name?: string;

  constructor(data?: PartialMessage<TeamStadiumScoreBonus>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.TeamStadiumScoreBonus";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TeamStadiumScoreBonus {
    return new TeamStadiumScoreBonus().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TeamStadiumScoreBonus {
    return new TeamStadiumScoreBonus().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TeamStadiumScoreBonus {
    return new TeamStadiumScoreBonus().fromJsonString(jsonString, options);
  }

  static equals(a: TeamStadiumScoreBonus | PlainMessage<TeamStadiumScoreBonus> | undefined, b: TeamStadiumScoreBonus | PlainMessage<TeamStadiumScoreBonus> | undefined): boolean {
    return proto2.util.equals(TeamStadiumScoreBonus, a, b);
  }
}

/**
 * @generated from message hakuraku.Story
 */
export class Story extends Message<Story> {
  /**
   * @generated from field: optional int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: optional string name = 2;
   */
  name?: string;

  constructor(data?: PartialMessage<Story>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "hakuraku.Story";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Story {
    return new Story().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Story {
    return new Story().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Story {
    return new Story().fromJsonString(jsonString, options);
  }

  static equals(a: Story | PlainMessage<Story> | undefined, b: Story | PlainMessage<Story> | undefined): boolean {
    return proto2.util.equals(Story, a, b);
  }
}

