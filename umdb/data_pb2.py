# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: data.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='data.proto',
  package='hakuraku',
  syntax='proto2',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\ndata.proto\x12\x08hakuraku\"\x89\x03\n\nUMDatabase\x12\x0f\n\x07version\x18\x01 \x01(\t\x12\x1e\n\x05\x63hara\x18\x02 \x03(\x0b\x32\x0f.hakuraku.Chara\x12\x1c\n\x04\x63\x61rd\x18\t \x03(\x0b\x32\x0e.hakuraku.Card\x12\x39\n\x13succession_relation\x18\x03 \x03(\x0b\x32\x1c.hakuraku.SuccessionRelation\x12-\n\rrace_instance\x18\x04 \x03(\x0b\x32\x16.hakuraku.RaceInstance\x12)\n\x0bwins_saddle\x18\x05 \x03(\x0b\x32\x14.hakuraku.WinsSaddle\x12\x34\n\x11special_case_race\x18\x06 \x03(\x0b\x32\x19.hakuraku.SpecialCaseRace\x12\x1e\n\x05skill\x18\x07 \x03(\x0b\x32\x0f.hakuraku.Skill\x12\x41\n\x18team_stadium_score_bonus\x18\x08 \x03(\x0b\x32\x1f.hakuraku.TeamStadiumScoreBonus\"4\n\x05\x43hara\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\x11\n\tcast_name\x18\x03 \x01(\t\" \n\x04\x43\x61rd\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0c\n\x04name\x18\x02 \x01(\t\"\xa0\x01\n\x12SuccessionRelation\x12\x15\n\rrelation_type\x18\x01 \x01(\x05\x12\x16\n\x0erelation_point\x18\x02 \x01(\x05\x12\x33\n\x06member\x18\x03 \x03(\x0b\x32#.hakuraku.SuccessionRelation.Member\x1a&\n\x06Member\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x10\n\x08\x63hara_id\x18\x02 \x01(\x05\":\n\x0cRaceInstance\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\x10\n\x08\x64istance\x18\x03 \x01(\x05\"d\n\nWinsSaddle\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\x18\n\x10race_instance_id\x18\x03 \x03(\x05\x12\x10\n\x08priority\x18\x04 \x01(\x05\x12\x10\n\x08group_id\x18\x05 \x01(\x05\"\x9a\x02\n\x0fSpecialCaseRace\x12\x18\n\x10race_instance_id\x18\x01 \x01(\x05\x12\x15\n\rprogram_group\x18\x02 \x01(\x05\x12\x41\n\x0frace_permission\x18\x03 \x01(\x0e\x32(.hakuraku.SpecialCaseRace.RacePermission\x12\x10\n\x08\x63hara_id\x18\x04 \x03(\x05\"\x80\x01\n\x0eRacePermission\x12\x1b\n\x17UNKNOWN_RACE_PERMISSION\x10\x00\x12\x0e\n\nFIRST_YEAR\x10\x01\x12\x0f\n\x0bSECOND_YEAR\x10\x02\x12\x18\n\x14SECOND_OR_THIRD_YEAR\x10\x03\x12\x0e\n\nTHIRD_YEAR\x10\x04\x12\x06\n\x02\x45X\x10\x05\"F\n\x05Skill\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\x13\n\x0bgrade_value\x18\x03 \x01(\x11\x12\x0e\n\x06tag_id\x18\x04 \x03(\t\"1\n\x15TeamStadiumScoreBonus\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0c\n\x04name\x18\x02 \x01(\t'
)



_SPECIALCASERACE_RACEPERMISSION = _descriptor.EnumDescriptor(
  name='RacePermission',
  full_name='hakuraku.SpecialCaseRace.RacePermission',
  filename=None,
  file=DESCRIPTOR,
  create_key=_descriptor._internal_create_key,
  values=[
    _descriptor.EnumValueDescriptor(
      name='UNKNOWN_RACE_PERMISSION', index=0, number=0,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
    _descriptor.EnumValueDescriptor(
      name='FIRST_YEAR', index=1, number=1,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
    _descriptor.EnumValueDescriptor(
      name='SECOND_YEAR', index=2, number=2,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
    _descriptor.EnumValueDescriptor(
      name='SECOND_OR_THIRD_YEAR', index=3, number=3,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
    _descriptor.EnumValueDescriptor(
      name='THIRD_YEAR', index=4, number=4,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
    _descriptor.EnumValueDescriptor(
      name='EX', index=5, number=5,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=988,
  serialized_end=1116,
)
_sym_db.RegisterEnumDescriptor(_SPECIALCASERACE_RACEPERMISSION)


_UMDATABASE = _descriptor.Descriptor(
  name='UMDatabase',
  full_name='hakuraku.UMDatabase',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='version', full_name='hakuraku.UMDatabase.version', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='chara', full_name='hakuraku.UMDatabase.chara', index=1,
      number=2, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='card', full_name='hakuraku.UMDatabase.card', index=2,
      number=9, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='succession_relation', full_name='hakuraku.UMDatabase.succession_relation', index=3,
      number=3, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='race_instance', full_name='hakuraku.UMDatabase.race_instance', index=4,
      number=4, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='wins_saddle', full_name='hakuraku.UMDatabase.wins_saddle', index=5,
      number=5, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='special_case_race', full_name='hakuraku.UMDatabase.special_case_race', index=6,
      number=6, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='skill', full_name='hakuraku.UMDatabase.skill', index=7,
      number=7, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='team_stadium_score_bonus', full_name='hakuraku.UMDatabase.team_stadium_score_bonus', index=8,
      number=8, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=25,
  serialized_end=418,
)


_CHARA = _descriptor.Descriptor(
  name='Chara',
  full_name='hakuraku.Chara',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='hakuraku.Chara.id', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='name', full_name='hakuraku.Chara.name', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='cast_name', full_name='hakuraku.Chara.cast_name', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=420,
  serialized_end=472,
)


_CARD = _descriptor.Descriptor(
  name='Card',
  full_name='hakuraku.Card',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='hakuraku.Card.id', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='name', full_name='hakuraku.Card.name', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=474,
  serialized_end=506,
)


_SUCCESSIONRELATION_MEMBER = _descriptor.Descriptor(
  name='Member',
  full_name='hakuraku.SuccessionRelation.Member',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='hakuraku.SuccessionRelation.Member.id', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='chara_id', full_name='hakuraku.SuccessionRelation.Member.chara_id', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=631,
  serialized_end=669,
)

_SUCCESSIONRELATION = _descriptor.Descriptor(
  name='SuccessionRelation',
  full_name='hakuraku.SuccessionRelation',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='relation_type', full_name='hakuraku.SuccessionRelation.relation_type', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='relation_point', full_name='hakuraku.SuccessionRelation.relation_point', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='member', full_name='hakuraku.SuccessionRelation.member', index=2,
      number=3, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[_SUCCESSIONRELATION_MEMBER, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=509,
  serialized_end=669,
)


_RACEINSTANCE = _descriptor.Descriptor(
  name='RaceInstance',
  full_name='hakuraku.RaceInstance',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='hakuraku.RaceInstance.id', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='name', full_name='hakuraku.RaceInstance.name', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='distance', full_name='hakuraku.RaceInstance.distance', index=2,
      number=3, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=671,
  serialized_end=729,
)


_WINSSADDLE = _descriptor.Descriptor(
  name='WinsSaddle',
  full_name='hakuraku.WinsSaddle',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='hakuraku.WinsSaddle.id', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='name', full_name='hakuraku.WinsSaddle.name', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='race_instance_id', full_name='hakuraku.WinsSaddle.race_instance_id', index=2,
      number=3, type=5, cpp_type=1, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='priority', full_name='hakuraku.WinsSaddle.priority', index=3,
      number=4, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='group_id', full_name='hakuraku.WinsSaddle.group_id', index=4,
      number=5, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=731,
  serialized_end=831,
)


_SPECIALCASERACE = _descriptor.Descriptor(
  name='SpecialCaseRace',
  full_name='hakuraku.SpecialCaseRace',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='race_instance_id', full_name='hakuraku.SpecialCaseRace.race_instance_id', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='program_group', full_name='hakuraku.SpecialCaseRace.program_group', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='race_permission', full_name='hakuraku.SpecialCaseRace.race_permission', index=2,
      number=3, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='chara_id', full_name='hakuraku.SpecialCaseRace.chara_id', index=3,
      number=4, type=5, cpp_type=1, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
    _SPECIALCASERACE_RACEPERMISSION,
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=834,
  serialized_end=1116,
)


_SKILL = _descriptor.Descriptor(
  name='Skill',
  full_name='hakuraku.Skill',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='hakuraku.Skill.id', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='name', full_name='hakuraku.Skill.name', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='grade_value', full_name='hakuraku.Skill.grade_value', index=2,
      number=3, type=17, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='tag_id', full_name='hakuraku.Skill.tag_id', index=3,
      number=4, type=9, cpp_type=9, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=1118,
  serialized_end=1188,
)


_TEAMSTADIUMSCOREBONUS = _descriptor.Descriptor(
  name='TeamStadiumScoreBonus',
  full_name='hakuraku.TeamStadiumScoreBonus',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='hakuraku.TeamStadiumScoreBonus.id', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='name', full_name='hakuraku.TeamStadiumScoreBonus.name', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=1190,
  serialized_end=1239,
)

_UMDATABASE.fields_by_name['chara'].message_type = _CHARA
_UMDATABASE.fields_by_name['card'].message_type = _CARD
_UMDATABASE.fields_by_name['succession_relation'].message_type = _SUCCESSIONRELATION
_UMDATABASE.fields_by_name['race_instance'].message_type = _RACEINSTANCE
_UMDATABASE.fields_by_name['wins_saddle'].message_type = _WINSSADDLE
_UMDATABASE.fields_by_name['special_case_race'].message_type = _SPECIALCASERACE
_UMDATABASE.fields_by_name['skill'].message_type = _SKILL
_UMDATABASE.fields_by_name['team_stadium_score_bonus'].message_type = _TEAMSTADIUMSCOREBONUS
_SUCCESSIONRELATION_MEMBER.containing_type = _SUCCESSIONRELATION
_SUCCESSIONRELATION.fields_by_name['member'].message_type = _SUCCESSIONRELATION_MEMBER
_SPECIALCASERACE.fields_by_name['race_permission'].enum_type = _SPECIALCASERACE_RACEPERMISSION
_SPECIALCASERACE_RACEPERMISSION.containing_type = _SPECIALCASERACE
DESCRIPTOR.message_types_by_name['UMDatabase'] = _UMDATABASE
DESCRIPTOR.message_types_by_name['Chara'] = _CHARA
DESCRIPTOR.message_types_by_name['Card'] = _CARD
DESCRIPTOR.message_types_by_name['SuccessionRelation'] = _SUCCESSIONRELATION
DESCRIPTOR.message_types_by_name['RaceInstance'] = _RACEINSTANCE
DESCRIPTOR.message_types_by_name['WinsSaddle'] = _WINSSADDLE
DESCRIPTOR.message_types_by_name['SpecialCaseRace'] = _SPECIALCASERACE
DESCRIPTOR.message_types_by_name['Skill'] = _SKILL
DESCRIPTOR.message_types_by_name['TeamStadiumScoreBonus'] = _TEAMSTADIUMSCOREBONUS
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

UMDatabase = _reflection.GeneratedProtocolMessageType('UMDatabase', (_message.Message,), {
  'DESCRIPTOR' : _UMDATABASE,
  '__module__' : 'data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.UMDatabase)
  })
_sym_db.RegisterMessage(UMDatabase)

Chara = _reflection.GeneratedProtocolMessageType('Chara', (_message.Message,), {
  'DESCRIPTOR' : _CHARA,
  '__module__' : 'data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.Chara)
  })
_sym_db.RegisterMessage(Chara)

Card = _reflection.GeneratedProtocolMessageType('Card', (_message.Message,), {
  'DESCRIPTOR' : _CARD,
  '__module__' : 'data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.Card)
  })
_sym_db.RegisterMessage(Card)

SuccessionRelation = _reflection.GeneratedProtocolMessageType('SuccessionRelation', (_message.Message,), {

  'Member' : _reflection.GeneratedProtocolMessageType('Member', (_message.Message,), {
    'DESCRIPTOR' : _SUCCESSIONRELATION_MEMBER,
    '__module__' : 'data_pb2'
    # @@protoc_insertion_point(class_scope:hakuraku.SuccessionRelation.Member)
    })
  ,
  'DESCRIPTOR' : _SUCCESSIONRELATION,
  '__module__' : 'data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.SuccessionRelation)
  })
_sym_db.RegisterMessage(SuccessionRelation)
_sym_db.RegisterMessage(SuccessionRelation.Member)

RaceInstance = _reflection.GeneratedProtocolMessageType('RaceInstance', (_message.Message,), {
  'DESCRIPTOR' : _RACEINSTANCE,
  '__module__' : 'data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.RaceInstance)
  })
_sym_db.RegisterMessage(RaceInstance)

WinsSaddle = _reflection.GeneratedProtocolMessageType('WinsSaddle', (_message.Message,), {
  'DESCRIPTOR' : _WINSSADDLE,
  '__module__' : 'data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.WinsSaddle)
  })
_sym_db.RegisterMessage(WinsSaddle)

SpecialCaseRace = _reflection.GeneratedProtocolMessageType('SpecialCaseRace', (_message.Message,), {
  'DESCRIPTOR' : _SPECIALCASERACE,
  '__module__' : 'data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.SpecialCaseRace)
  })
_sym_db.RegisterMessage(SpecialCaseRace)

Skill = _reflection.GeneratedProtocolMessageType('Skill', (_message.Message,), {
  'DESCRIPTOR' : _SKILL,
  '__module__' : 'data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.Skill)
  })
_sym_db.RegisterMessage(Skill)

TeamStadiumScoreBonus = _reflection.GeneratedProtocolMessageType('TeamStadiumScoreBonus', (_message.Message,), {
  'DESCRIPTOR' : _TEAMSTADIUMSCOREBONUS,
  '__module__' : 'data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.TeamStadiumScoreBonus)
  })
_sym_db.RegisterMessage(TeamStadiumScoreBonus)


# @@protoc_insertion_point(module_scope)
