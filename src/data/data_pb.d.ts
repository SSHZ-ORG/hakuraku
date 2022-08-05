// package: hakuraku
// file: data.proto

import * as jspb from "google-protobuf";

export class UMDatabase extends jspb.Message {
  hasVersion(): boolean;
  clearVersion(): void;
  getVersion(): string | undefined;
  setVersion(value: string): void;

  clearCharaList(): void;
  getCharaList(): Array<Chara>;
  setCharaList(value: Array<Chara>): void;
  addChara(value?: Chara, index?: number): Chara;

  clearCardList(): void;
  getCardList(): Array<Card>;
  setCardList(value: Array<Card>): void;
  addCard(value?: Card, index?: number): Card;

  clearSupportCardList(): void;
  getSupportCardList(): Array<SupportCard>;
  setSupportCardList(value: Array<SupportCard>): void;
  addSupportCard(value?: SupportCard, index?: number): SupportCard;

  clearSuccessionRelationList(): void;
  getSuccessionRelationList(): Array<SuccessionRelation>;
  setSuccessionRelationList(value: Array<SuccessionRelation>): void;
  addSuccessionRelation(value?: SuccessionRelation, index?: number): SuccessionRelation;

  clearRaceInstanceList(): void;
  getRaceInstanceList(): Array<RaceInstance>;
  setRaceInstanceList(value: Array<RaceInstance>): void;
  addRaceInstance(value?: RaceInstance, index?: number): RaceInstance;

  clearWinsSaddleList(): void;
  getWinsSaddleList(): Array<WinsSaddle>;
  setWinsSaddleList(value: Array<WinsSaddle>): void;
  addWinsSaddle(value?: WinsSaddle, index?: number): WinsSaddle;

  clearSpecialCaseRaceList(): void;
  getSpecialCaseRaceList(): Array<SpecialCaseRace>;
  setSpecialCaseRaceList(value: Array<SpecialCaseRace>): void;
  addSpecialCaseRace(value?: SpecialCaseRace, index?: number): SpecialCaseRace;

  clearSkillList(): void;
  getSkillList(): Array<Skill>;
  setSkillList(value: Array<Skill>): void;
  addSkill(value?: Skill, index?: number): Skill;

  clearTeamStadiumScoreBonusList(): void;
  getTeamStadiumScoreBonusList(): Array<TeamStadiumScoreBonus>;
  setTeamStadiumScoreBonusList(value: Array<TeamStadiumScoreBonus>): void;
  addTeamStadiumScoreBonus(value?: TeamStadiumScoreBonus, index?: number): TeamStadiumScoreBonus;

  clearStoryList(): void;
  getStoryList(): Array<Story>;
  setStoryList(value: Array<Story>): void;
  addStory(value?: Story, index?: number): Story;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UMDatabase.AsObject;
  static toObject(includeInstance: boolean, msg: UMDatabase): UMDatabase.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UMDatabase, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UMDatabase;
  static deserializeBinaryFromReader(message: UMDatabase, reader: jspb.BinaryReader): UMDatabase;
}

export namespace UMDatabase {
  export type AsObject = {
    version?: string,
    charaList: Array<Chara.AsObject>,
    cardList: Array<Card.AsObject>,
    supportCardList: Array<SupportCard.AsObject>,
    successionRelationList: Array<SuccessionRelation.AsObject>,
    raceInstanceList: Array<RaceInstance.AsObject>,
    winsSaddleList: Array<WinsSaddle.AsObject>,
    specialCaseRaceList: Array<SpecialCaseRace.AsObject>,
    skillList: Array<Skill.AsObject>,
    teamStadiumScoreBonusList: Array<TeamStadiumScoreBonus.AsObject>,
    storyList: Array<Story.AsObject>,
  }
}

export class Chara extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): number | undefined;
  setId(value: number): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  hasCastName(): boolean;
  clearCastName(): void;
  getCastName(): string | undefined;
  setCastName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Chara.AsObject;
  static toObject(includeInstance: boolean, msg: Chara): Chara.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Chara, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Chara;
  static deserializeBinaryFromReader(message: Chara, reader: jspb.BinaryReader): Chara;
}

export namespace Chara {
  export type AsObject = {
    id?: number,
    name?: string,
    castName?: string,
  }
}

export class Card extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): number | undefined;
  setId(value: number): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Card.AsObject;
  static toObject(includeInstance: boolean, msg: Card): Card.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Card, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Card;
  static deserializeBinaryFromReader(message: Card, reader: jspb.BinaryReader): Card;
}

export namespace Card {
  export type AsObject = {
    id?: number,
    name?: string,
  }
}

export class SupportCard extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): number | undefined;
  setId(value: number): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  hasCharaId(): boolean;
  clearCharaId(): void;
  getCharaId(): number | undefined;
  setCharaId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SupportCard.AsObject;
  static toObject(includeInstance: boolean, msg: SupportCard): SupportCard.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SupportCard, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SupportCard;
  static deserializeBinaryFromReader(message: SupportCard, reader: jspb.BinaryReader): SupportCard;
}

export namespace SupportCard {
  export type AsObject = {
    id?: number,
    name?: string,
    charaId?: number,
  }
}

export class SuccessionRelation extends jspb.Message {
  hasRelationType(): boolean;
  clearRelationType(): void;
  getRelationType(): number | undefined;
  setRelationType(value: number): void;

  hasRelationPoint(): boolean;
  clearRelationPoint(): void;
  getRelationPoint(): number | undefined;
  setRelationPoint(value: number): void;

  clearMemberList(): void;
  getMemberList(): Array<SuccessionRelation.Member>;
  setMemberList(value: Array<SuccessionRelation.Member>): void;
  addMember(value?: SuccessionRelation.Member, index?: number): SuccessionRelation.Member;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SuccessionRelation.AsObject;
  static toObject(includeInstance: boolean, msg: SuccessionRelation): SuccessionRelation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SuccessionRelation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SuccessionRelation;
  static deserializeBinaryFromReader(message: SuccessionRelation, reader: jspb.BinaryReader): SuccessionRelation;
}

export namespace SuccessionRelation {
  export type AsObject = {
    relationType?: number,
    relationPoint?: number,
    memberList: Array<SuccessionRelation.Member.AsObject>,
  }

  export class Member extends jspb.Message {
    hasId(): boolean;
    clearId(): void;
    getId(): number | undefined;
    setId(value: number): void;

    hasCharaId(): boolean;
    clearCharaId(): void;
    getCharaId(): number | undefined;
    setCharaId(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Member.AsObject;
    static toObject(includeInstance: boolean, msg: Member): Member.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Member, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Member;
    static deserializeBinaryFromReader(message: Member, reader: jspb.BinaryReader): Member;
  }

  export namespace Member {
    export type AsObject = {
      id?: number,
      charaId?: number,
    }
  }
}

export class RaceInstance extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): number | undefined;
  setId(value: number): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  hasDistance(): boolean;
  clearDistance(): void;
  getDistance(): number | undefined;
  setDistance(value: number): void;

  hasGroundType(): boolean;
  clearGroundType(): void;
  getGroundType(): RaceInstance.GroundTypeMap[keyof RaceInstance.GroundTypeMap] | undefined;
  setGroundType(value: RaceInstance.GroundTypeMap[keyof RaceInstance.GroundTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RaceInstance.AsObject;
  static toObject(includeInstance: boolean, msg: RaceInstance): RaceInstance.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RaceInstance, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RaceInstance;
  static deserializeBinaryFromReader(message: RaceInstance, reader: jspb.BinaryReader): RaceInstance;
}

export namespace RaceInstance {
  export type AsObject = {
    id?: number,
    name?: string,
    distance?: number,
    groundType?: RaceInstance.GroundTypeMap[keyof RaceInstance.GroundTypeMap],
  }

  export interface GroundTypeMap {
    UNKNOWN_GROUND_TYPE: 0;
    TURF: 1;
    DIRT: 2;
  }

  export const GroundType: GroundTypeMap;
}

export class WinsSaddle extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): number | undefined;
  setId(value: number): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  clearRaceInstanceIdList(): void;
  getRaceInstanceIdList(): Array<number>;
  setRaceInstanceIdList(value: Array<number>): void;
  addRaceInstanceId(value: number, index?: number): number;

  hasPriority(): boolean;
  clearPriority(): void;
  getPriority(): number | undefined;
  setPriority(value: number): void;

  hasGroupId(): boolean;
  clearGroupId(): void;
  getGroupId(): number | undefined;
  setGroupId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WinsSaddle.AsObject;
  static toObject(includeInstance: boolean, msg: WinsSaddle): WinsSaddle.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WinsSaddle, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WinsSaddle;
  static deserializeBinaryFromReader(message: WinsSaddle, reader: jspb.BinaryReader): WinsSaddle;
}

export namespace WinsSaddle {
  export type AsObject = {
    id?: number,
    name?: string,
    raceInstanceIdList: Array<number>,
    priority?: number,
    groupId?: number,
  }
}

export class SpecialCaseRace extends jspb.Message {
  hasRaceInstanceId(): boolean;
  clearRaceInstanceId(): void;
  getRaceInstanceId(): number | undefined;
  setRaceInstanceId(value: number): void;

  hasProgramGroup(): boolean;
  clearProgramGroup(): void;
  getProgramGroup(): number | undefined;
  setProgramGroup(value: number): void;

  hasRacePermission(): boolean;
  clearRacePermission(): void;
  getRacePermission(): SpecialCaseRace.RacePermissionMap[keyof SpecialCaseRace.RacePermissionMap] | undefined;
  setRacePermission(value: SpecialCaseRace.RacePermissionMap[keyof SpecialCaseRace.RacePermissionMap]): void;

  clearCharaIdList(): void;
  getCharaIdList(): Array<number>;
  setCharaIdList(value: Array<number>): void;
  addCharaId(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SpecialCaseRace.AsObject;
  static toObject(includeInstance: boolean, msg: SpecialCaseRace): SpecialCaseRace.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SpecialCaseRace, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SpecialCaseRace;
  static deserializeBinaryFromReader(message: SpecialCaseRace, reader: jspb.BinaryReader): SpecialCaseRace;
}

export namespace SpecialCaseRace {
  export type AsObject = {
    raceInstanceId?: number,
    programGroup?: number,
    racePermission?: SpecialCaseRace.RacePermissionMap[keyof SpecialCaseRace.RacePermissionMap],
    charaIdList: Array<number>,
  }

  export interface RacePermissionMap {
    UNKNOWN_RACE_PERMISSION: 0;
    FIRST_YEAR: 1;
    SECOND_YEAR: 2;
    SECOND_OR_THIRD_YEAR: 3;
    THIRD_YEAR: 4;
    EX: 5;
  }

  export const RacePermission: RacePermissionMap;
}

export class Skill extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): number | undefined;
  setId(value: number): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  hasGradeValue(): boolean;
  clearGradeValue(): void;
  getGradeValue(): number | undefined;
  setGradeValue(value: number): void;

  clearTagIdList(): void;
  getTagIdList(): Array<string>;
  setTagIdList(value: Array<string>): void;
  addTagId(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Skill.AsObject;
  static toObject(includeInstance: boolean, msg: Skill): Skill.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Skill, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Skill;
  static deserializeBinaryFromReader(message: Skill, reader: jspb.BinaryReader): Skill;
}

export namespace Skill {
  export type AsObject = {
    id?: number,
    name?: string,
    gradeValue?: number,
    tagIdList: Array<string>,
  }
}

export class TeamStadiumScoreBonus extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): number | undefined;
  setId(value: number): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TeamStadiumScoreBonus.AsObject;
  static toObject(includeInstance: boolean, msg: TeamStadiumScoreBonus): TeamStadiumScoreBonus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TeamStadiumScoreBonus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TeamStadiumScoreBonus;
  static deserializeBinaryFromReader(message: TeamStadiumScoreBonus, reader: jspb.BinaryReader): TeamStadiumScoreBonus;
}

export namespace TeamStadiumScoreBonus {
  export type AsObject = {
    id?: number,
    name?: string,
  }
}

export class Story extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): number | undefined;
  setId(value: number): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Story.AsObject;
  static toObject(includeInstance: boolean, msg: Story): Story.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Story, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Story;
  static deserializeBinaryFromReader(message: Story, reader: jspb.BinaryReader): Story;
}

export namespace Story {
  export type AsObject = {
    id?: number,
    name?: string,
  }
}

