from google.protobuf.internal import containers as _containers
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar, Iterable, Mapping, Optional, Union

DESCRIPTOR: _descriptor.FileDescriptor

class RaceSimulateData(_message.Message):
    __slots__ = ["__padding_size_1", "__padding_size_2", "__padding_size_3", "distance_diff_max", "event", "event_count", "frame", "frame_count", "frame_size", "header", "horse_frame_size", "horse_num", "horse_result", "horse_result_size"]
    class EventDataWrapper(_message.Message):
        __slots__ = ["event", "event_size"]
        EVENT_FIELD_NUMBER: ClassVar[int]
        EVENT_SIZE_FIELD_NUMBER: ClassVar[int]
        event: RaceSimulateEventData
        event_size: int
        def __init__(self, event_size: Optional[int] = ..., event: Optional[Union[RaceSimulateEventData, Mapping]] = ...) -> None: ...
    DISTANCE_DIFF_MAX_FIELD_NUMBER: ClassVar[int]
    EVENT_COUNT_FIELD_NUMBER: ClassVar[int]
    EVENT_FIELD_NUMBER: ClassVar[int]
    FRAME_COUNT_FIELD_NUMBER: ClassVar[int]
    FRAME_FIELD_NUMBER: ClassVar[int]
    FRAME_SIZE_FIELD_NUMBER: ClassVar[int]
    HEADER_FIELD_NUMBER: ClassVar[int]
    HORSE_FRAME_SIZE_FIELD_NUMBER: ClassVar[int]
    HORSE_NUM_FIELD_NUMBER: ClassVar[int]
    HORSE_RESULT_FIELD_NUMBER: ClassVar[int]
    HORSE_RESULT_SIZE_FIELD_NUMBER: ClassVar[int]
    __PADDING_SIZE_1_FIELD_NUMBER: ClassVar[int]
    __PADDING_SIZE_2_FIELD_NUMBER: ClassVar[int]
    __PADDING_SIZE_3_FIELD_NUMBER: ClassVar[int]
    __padding_size_1: int
    __padding_size_2: int
    __padding_size_3: int
    distance_diff_max: float
    event: _containers.RepeatedCompositeFieldContainer[RaceSimulateData.EventDataWrapper]
    event_count: int
    frame: _containers.RepeatedCompositeFieldContainer[RaceSimulateFrameData]
    frame_count: int
    frame_size: int
    header: RaceSimulateHeaderData
    horse_frame_size: int
    horse_num: int
    horse_result: _containers.RepeatedCompositeFieldContainer[RaceSimulateHorseResultData]
    horse_result_size: int
    def __init__(self, header: Optional[Union[RaceSimulateHeaderData, Mapping]] = ..., distance_diff_max: Optional[float] = ..., horse_num: Optional[int] = ..., horse_frame_size: Optional[int] = ..., horse_result_size: Optional[int] = ..., __padding_size_1: Optional[int] = ..., frame_count: Optional[int] = ..., frame_size: Optional[int] = ..., frame: Optional[Iterable[Union[RaceSimulateFrameData, Mapping]]] = ..., __padding_size_2: Optional[int] = ..., horse_result: Optional[Iterable[Union[RaceSimulateHorseResultData, Mapping]]] = ..., __padding_size_3: Optional[int] = ..., event_count: Optional[int] = ..., event: Optional[Iterable[Union[RaceSimulateData.EventDataWrapper, Mapping]]] = ...) -> None: ...

class RaceSimulateEventData(_message.Message):
    __slots__ = ["frame_time", "param", "param_count", "type"]
    class SimulateEventType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
        __slots__ = []
    CHALLENGE_MATCH_POINT: RaceSimulateEventData.SimulateEventType
    COMPETE_FIGHT: RaceSimulateEventData.SimulateEventType
    COMPETE_TOP: RaceSimulateEventData.SimulateEventType
    FRAME_TIME_FIELD_NUMBER: ClassVar[int]
    NOUSE_2: RaceSimulateEventData.SimulateEventType
    PARAM_COUNT_FIELD_NUMBER: ClassVar[int]
    PARAM_FIELD_NUMBER: ClassVar[int]
    SCORE: RaceSimulateEventData.SimulateEventType
    SKILL: RaceSimulateEventData.SimulateEventType
    TYPE_FIELD_NUMBER: ClassVar[int]
    frame_time: float
    param: _containers.RepeatedScalarFieldContainer[int]
    param_count: int
    type: RaceSimulateEventData.SimulateEventType
    def __init__(self, frame_time: Optional[float] = ..., type: Optional[Union[RaceSimulateEventData.SimulateEventType, str]] = ..., param_count: Optional[int] = ..., param: Optional[Iterable[int]] = ...) -> None: ...

class RaceSimulateFrameData(_message.Message):
    __slots__ = ["horse_frame", "time"]
    HORSE_FRAME_FIELD_NUMBER: ClassVar[int]
    TIME_FIELD_NUMBER: ClassVar[int]
    horse_frame: _containers.RepeatedCompositeFieldContainer[RaceSimulateHorseFrameData]
    time: float
    def __init__(self, time: Optional[float] = ..., horse_frame: Optional[Iterable[Union[RaceSimulateHorseFrameData, Mapping]]] = ...) -> None: ...

class RaceSimulateHeaderData(_message.Message):
    __slots__ = ["max_length", "version"]
    MAX_LENGTH_FIELD_NUMBER: ClassVar[int]
    VERSION_FIELD_NUMBER: ClassVar[int]
    max_length: int
    version: int
    def __init__(self, max_length: Optional[int] = ..., version: Optional[int] = ...) -> None: ...

class RaceSimulateHorseFrameData(_message.Message):
    __slots__ = ["block_front_horse_index", "distance", "hp", "lane_position", "speed", "temptation_mode"]
    BLOCK_FRONT_HORSE_INDEX_FIELD_NUMBER: ClassVar[int]
    DISTANCE_FIELD_NUMBER: ClassVar[int]
    HP_FIELD_NUMBER: ClassVar[int]
    LANE_POSITION_FIELD_NUMBER: ClassVar[int]
    SPEED_FIELD_NUMBER: ClassVar[int]
    TEMPTATION_MODE_FIELD_NUMBER: ClassVar[int]
    block_front_horse_index: int
    distance: float
    hp: int
    lane_position: int
    speed: int
    temptation_mode: int
    def __init__(self, distance: Optional[float] = ..., lane_position: Optional[int] = ..., speed: Optional[int] = ..., hp: Optional[int] = ..., temptation_mode: Optional[int] = ..., block_front_horse_index: Optional[int] = ...) -> None: ...

class RaceSimulateHorseResultData(_message.Message):
    __slots__ = ["defeat", "finish_diff_time", "finish_order", "finish_time", "finish_time_raw", "guts_order", "last_spurt_start_distance", "running_style", "start_delay_time", "wiz_order"]
    DEFEAT_FIELD_NUMBER: ClassVar[int]
    FINISH_DIFF_TIME_FIELD_NUMBER: ClassVar[int]
    FINISH_ORDER_FIELD_NUMBER: ClassVar[int]
    FINISH_TIME_FIELD_NUMBER: ClassVar[int]
    FINISH_TIME_RAW_FIELD_NUMBER: ClassVar[int]
    GUTS_ORDER_FIELD_NUMBER: ClassVar[int]
    LAST_SPURT_START_DISTANCE_FIELD_NUMBER: ClassVar[int]
    RUNNING_STYLE_FIELD_NUMBER: ClassVar[int]
    START_DELAY_TIME_FIELD_NUMBER: ClassVar[int]
    WIZ_ORDER_FIELD_NUMBER: ClassVar[int]
    defeat: int
    finish_diff_time: float
    finish_order: int
    finish_time: float
    finish_time_raw: float
    guts_order: int
    last_spurt_start_distance: float
    running_style: int
    start_delay_time: float
    wiz_order: int
    def __init__(self, finish_order: Optional[int] = ..., finish_time: Optional[float] = ..., finish_diff_time: Optional[float] = ..., start_delay_time: Optional[float] = ..., guts_order: Optional[int] = ..., wiz_order: Optional[int] = ..., last_spurt_start_distance: Optional[float] = ..., running_style: Optional[int] = ..., defeat: Optional[int] = ..., finish_time_raw: Optional[float] = ...) -> None: ...
