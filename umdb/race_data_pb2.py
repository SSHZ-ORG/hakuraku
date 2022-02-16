# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: race_data.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0frace_data.proto\x12\x08hakuraku\"\xb4\x04\n\x10RaceSimulateData\x12\x30\n\x06header\x18\x01 \x01(\x0b\x32 .hakuraku.RaceSimulateHeaderData\x12\x19\n\x11\x64istance_diff_max\x18\x02 \x01(\x02\x12\x11\n\thorse_num\x18\x03 \x01(\x05\x12\x18\n\x10horse_frame_size\x18\x04 \x01(\x05\x12\x19\n\x11horse_result_size\x18\x05 \x01(\x05\x12\x18\n\x10__padding_size_1\x18\x06 \x01(\x05\x12\x13\n\x0b\x66rame_count\x18\x07 \x01(\x05\x12\x12\n\nframe_size\x18\x08 \x01(\x05\x12.\n\x05\x66rame\x18\t \x03(\x0b\x32\x1f.hakuraku.RaceSimulateFrameData\x12\x18\n\x10__padding_size_2\x18\n \x01(\x05\x12;\n\x0chorse_result\x18\x0b \x03(\x0b\x32%.hakuraku.RaceSimulateHorseResultData\x12\x18\n\x10__padding_size_3\x18\x0c \x01(\x05\x12\x13\n\x0b\x65vent_count\x18\r \x01(\x05\x12:\n\x05\x65vent\x18\x0e \x03(\x0b\x32+.hakuraku.RaceSimulateData.EventDataWrapper\x1aV\n\x10\x45ventDataWrapper\x12\x12\n\nevent_size\x18\x01 \x01(\x05\x12.\n\x05\x65vent\x18\x02 \x01(\x0b\x32\x1f.hakuraku.RaceSimulateEventData\"=\n\x16RaceSimulateHeaderData\x12\x12\n\nmax_length\x18\x01 \x01(\x05\x12\x0f\n\x07version\x18\x02 \x01(\x05\"`\n\x15RaceSimulateFrameData\x12\x0c\n\x04time\x18\x01 \x01(\x02\x12\x39\n\x0bhorse_frame\x18\x02 \x03(\x0b\x32$.hakuraku.RaceSimulateHorseFrameData\"\x9a\x01\n\x1aRaceSimulateHorseFrameData\x12\x10\n\x08\x64istance\x18\x01 \x01(\x02\x12\x15\n\rlane_position\x18\x02 \x01(\r\x12\r\n\x05speed\x18\x03 \x01(\r\x12\n\n\x02hp\x18\x04 \x01(\r\x12\x17\n\x0ftemptation_mode\x18\x05 \x01(\x05\x12\x1f\n\x17\x62lock_front_horse_index\x18\x06 \x01(\x05\"\x86\x02\n\x1bRaceSimulateHorseResultData\x12\x14\n\x0c\x66inish_order\x18\x01 \x01(\x05\x12\x13\n\x0b\x66inish_time\x18\x02 \x01(\x02\x12\x18\n\x10\x66inish_diff_time\x18\x03 \x01(\x02\x12\x18\n\x10start_delay_time\x18\x04 \x01(\x02\x12\x12\n\nguts_order\x18\x05 \x01(\r\x12\x11\n\twiz_order\x18\x06 \x01(\r\x12!\n\x19last_spurt_start_distance\x18\x07 \x01(\x02\x12\x15\n\rrunning_style\x18\x08 \x01(\r\x12\x0e\n\x06\x64\x65\x66\x65\x61t\x18\t \x01(\x05\x12\x17\n\x0f\x66inish_time_raw\x18\n \x01(\x02\"\xd5\x01\n\x15RaceSimulateEventData\x12\x12\n\nframe_time\x18\x01 \x01(\x02\x12?\n\x04type\x18\x02 \x01(\x0e\x32\x31.hakuraku.RaceSimulateEventData.SimulateEventType\x12\x13\n\x0bparam_count\x18\x03 \x01(\r\x12\r\n\x05param\x18\x04 \x03(\x05\"C\n\x11SimulateEventType\x12\t\n\x05SCORE\x10\x00\x12\x0b\n\x07NOUSE_1\x10\x01\x12\x0b\n\x07NOUSE_2\x10\x02\x12\t\n\x05SKILL\x10\x03')



_RACESIMULATEDATA = DESCRIPTOR.message_types_by_name['RaceSimulateData']
_RACESIMULATEDATA_EVENTDATAWRAPPER = _RACESIMULATEDATA.nested_types_by_name['EventDataWrapper']
_RACESIMULATEHEADERDATA = DESCRIPTOR.message_types_by_name['RaceSimulateHeaderData']
_RACESIMULATEFRAMEDATA = DESCRIPTOR.message_types_by_name['RaceSimulateFrameData']
_RACESIMULATEHORSEFRAMEDATA = DESCRIPTOR.message_types_by_name['RaceSimulateHorseFrameData']
_RACESIMULATEHORSERESULTDATA = DESCRIPTOR.message_types_by_name['RaceSimulateHorseResultData']
_RACESIMULATEEVENTDATA = DESCRIPTOR.message_types_by_name['RaceSimulateEventData']
_RACESIMULATEEVENTDATA_SIMULATEEVENTTYPE = _RACESIMULATEEVENTDATA.enum_types_by_name['SimulateEventType']
RaceSimulateData = _reflection.GeneratedProtocolMessageType('RaceSimulateData', (_message.Message,), {

  'EventDataWrapper' : _reflection.GeneratedProtocolMessageType('EventDataWrapper', (_message.Message,), {
    'DESCRIPTOR' : _RACESIMULATEDATA_EVENTDATAWRAPPER,
    '__module__' : 'race_data_pb2'
    # @@protoc_insertion_point(class_scope:hakuraku.RaceSimulateData.EventDataWrapper)
    })
  ,
  'DESCRIPTOR' : _RACESIMULATEDATA,
  '__module__' : 'race_data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.RaceSimulateData)
  })
_sym_db.RegisterMessage(RaceSimulateData)
_sym_db.RegisterMessage(RaceSimulateData.EventDataWrapper)

RaceSimulateHeaderData = _reflection.GeneratedProtocolMessageType('RaceSimulateHeaderData', (_message.Message,), {
  'DESCRIPTOR' : _RACESIMULATEHEADERDATA,
  '__module__' : 'race_data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.RaceSimulateHeaderData)
  })
_sym_db.RegisterMessage(RaceSimulateHeaderData)

RaceSimulateFrameData = _reflection.GeneratedProtocolMessageType('RaceSimulateFrameData', (_message.Message,), {
  'DESCRIPTOR' : _RACESIMULATEFRAMEDATA,
  '__module__' : 'race_data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.RaceSimulateFrameData)
  })
_sym_db.RegisterMessage(RaceSimulateFrameData)

RaceSimulateHorseFrameData = _reflection.GeneratedProtocolMessageType('RaceSimulateHorseFrameData', (_message.Message,), {
  'DESCRIPTOR' : _RACESIMULATEHORSEFRAMEDATA,
  '__module__' : 'race_data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.RaceSimulateHorseFrameData)
  })
_sym_db.RegisterMessage(RaceSimulateHorseFrameData)

RaceSimulateHorseResultData = _reflection.GeneratedProtocolMessageType('RaceSimulateHorseResultData', (_message.Message,), {
  'DESCRIPTOR' : _RACESIMULATEHORSERESULTDATA,
  '__module__' : 'race_data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.RaceSimulateHorseResultData)
  })
_sym_db.RegisterMessage(RaceSimulateHorseResultData)

RaceSimulateEventData = _reflection.GeneratedProtocolMessageType('RaceSimulateEventData', (_message.Message,), {
  'DESCRIPTOR' : _RACESIMULATEEVENTDATA,
  '__module__' : 'race_data_pb2'
  # @@protoc_insertion_point(class_scope:hakuraku.RaceSimulateEventData)
  })
_sym_db.RegisterMessage(RaceSimulateEventData)

if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _RACESIMULATEDATA._serialized_start=30
  _RACESIMULATEDATA._serialized_end=594
  _RACESIMULATEDATA_EVENTDATAWRAPPER._serialized_start=508
  _RACESIMULATEDATA_EVENTDATAWRAPPER._serialized_end=594
  _RACESIMULATEHEADERDATA._serialized_start=596
  _RACESIMULATEHEADERDATA._serialized_end=657
  _RACESIMULATEFRAMEDATA._serialized_start=659
  _RACESIMULATEFRAMEDATA._serialized_end=755
  _RACESIMULATEHORSEFRAMEDATA._serialized_start=758
  _RACESIMULATEHORSEFRAMEDATA._serialized_end=912
  _RACESIMULATEHORSERESULTDATA._serialized_start=915
  _RACESIMULATEHORSERESULTDATA._serialized_end=1177
  _RACESIMULATEEVENTDATA._serialized_start=1180
  _RACESIMULATEEVENTDATA._serialized_end=1393
  _RACESIMULATEEVENTDATA_SIMULATEEVENTTYPE._serialized_start=1326
  _RACESIMULATEEVENTDATA_SIMULATEEVENTTYPE._serialized_end=1393
# @@protoc_insertion_point(module_scope)
