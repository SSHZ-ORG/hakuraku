from google.protobuf.internal import containers as _containers
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar, Iterable, Mapping, Optional, Union

DESCRIPTOR: _descriptor.FileDescriptor

class Card(_message.Message):
    __slots__ = ["id", "name"]
    ID_FIELD_NUMBER: ClassVar[int]
    NAME_FIELD_NUMBER: ClassVar[int]
    id: int
    name: str
    def __init__(self, id: Optional[int] = ..., name: Optional[str] = ...) -> None: ...

class Chara(_message.Message):
    __slots__ = ["cast_name", "id", "name"]
    CAST_NAME_FIELD_NUMBER: ClassVar[int]
    ID_FIELD_NUMBER: ClassVar[int]
    NAME_FIELD_NUMBER: ClassVar[int]
    cast_name: str
    id: int
    name: str
    def __init__(self, id: Optional[int] = ..., name: Optional[str] = ..., cast_name: Optional[str] = ...) -> None: ...

class RaceInstance(_message.Message):
    __slots__ = ["distance", "ground_type", "id", "name"]
    class GroundType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
        __slots__ = []
    DIRT: RaceInstance.GroundType
    DISTANCE_FIELD_NUMBER: ClassVar[int]
    GROUND_TYPE_FIELD_NUMBER: ClassVar[int]
    ID_FIELD_NUMBER: ClassVar[int]
    NAME_FIELD_NUMBER: ClassVar[int]
    TURF: RaceInstance.GroundType
    UNKNOWN_GROUND_TYPE: RaceInstance.GroundType
    distance: int
    ground_type: RaceInstance.GroundType
    id: int
    name: str
    def __init__(self, id: Optional[int] = ..., name: Optional[str] = ..., distance: Optional[int] = ..., ground_type: Optional[Union[RaceInstance.GroundType, str]] = ...) -> None: ...

class Skill(_message.Message):
    __slots__ = ["grade_value", "id", "name", "tag_id"]
    GRADE_VALUE_FIELD_NUMBER: ClassVar[int]
    ID_FIELD_NUMBER: ClassVar[int]
    NAME_FIELD_NUMBER: ClassVar[int]
    TAG_ID_FIELD_NUMBER: ClassVar[int]
    grade_value: int
    id: int
    name: str
    tag_id: _containers.RepeatedScalarFieldContainer[str]
    def __init__(self, id: Optional[int] = ..., name: Optional[str] = ..., grade_value: Optional[int] = ..., tag_id: Optional[Iterable[str]] = ...) -> None: ...

class SpecialCaseRace(_message.Message):
    __slots__ = ["chara_id", "program_group", "race_instance_id", "race_permission"]
    class RacePermission(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
        __slots__ = []
    CHARA_ID_FIELD_NUMBER: ClassVar[int]
    EX: SpecialCaseRace.RacePermission
    FIRST_YEAR: SpecialCaseRace.RacePermission
    PROGRAM_GROUP_FIELD_NUMBER: ClassVar[int]
    RACE_INSTANCE_ID_FIELD_NUMBER: ClassVar[int]
    RACE_PERMISSION_FIELD_NUMBER: ClassVar[int]
    SECOND_OR_THIRD_YEAR: SpecialCaseRace.RacePermission
    SECOND_YEAR: SpecialCaseRace.RacePermission
    THIRD_YEAR: SpecialCaseRace.RacePermission
    UNKNOWN_RACE_PERMISSION: SpecialCaseRace.RacePermission
    chara_id: _containers.RepeatedScalarFieldContainer[int]
    program_group: int
    race_instance_id: int
    race_permission: SpecialCaseRace.RacePermission
    def __init__(self, race_instance_id: Optional[int] = ..., program_group: Optional[int] = ..., race_permission: Optional[Union[SpecialCaseRace.RacePermission, str]] = ..., chara_id: Optional[Iterable[int]] = ...) -> None: ...

class Story(_message.Message):
    __slots__ = ["id", "name"]
    ID_FIELD_NUMBER: ClassVar[int]
    NAME_FIELD_NUMBER: ClassVar[int]
    id: int
    name: str
    def __init__(self, id: Optional[int] = ..., name: Optional[str] = ...) -> None: ...

class SuccessionRelation(_message.Message):
    __slots__ = ["member", "relation_point", "relation_type"]
    class Member(_message.Message):
        __slots__ = ["chara_id", "id"]
        CHARA_ID_FIELD_NUMBER: ClassVar[int]
        ID_FIELD_NUMBER: ClassVar[int]
        chara_id: int
        id: int
        def __init__(self, id: Optional[int] = ..., chara_id: Optional[int] = ...) -> None: ...
    MEMBER_FIELD_NUMBER: ClassVar[int]
    RELATION_POINT_FIELD_NUMBER: ClassVar[int]
    RELATION_TYPE_FIELD_NUMBER: ClassVar[int]
    member: _containers.RepeatedCompositeFieldContainer[SuccessionRelation.Member]
    relation_point: int
    relation_type: int
    def __init__(self, relation_type: Optional[int] = ..., relation_point: Optional[int] = ..., member: Optional[Iterable[Union[SuccessionRelation.Member, Mapping]]] = ...) -> None: ...

class SupportCard(_message.Message):
    __slots__ = ["chara_id", "id", "name"]
    CHARA_ID_FIELD_NUMBER: ClassVar[int]
    ID_FIELD_NUMBER: ClassVar[int]
    NAME_FIELD_NUMBER: ClassVar[int]
    chara_id: int
    id: int
    name: str
    def __init__(self, id: Optional[int] = ..., name: Optional[str] = ..., chara_id: Optional[int] = ...) -> None: ...

class TeamStadiumScoreBonus(_message.Message):
    __slots__ = ["id", "name"]
    ID_FIELD_NUMBER: ClassVar[int]
    NAME_FIELD_NUMBER: ClassVar[int]
    id: int
    name: str
    def __init__(self, id: Optional[int] = ..., name: Optional[str] = ...) -> None: ...

class UMDatabase(_message.Message):
    __slots__ = ["card", "chara", "race_instance", "skill", "special_case_race", "story", "succession_relation", "support_card", "team_stadium_score_bonus", "version", "wins_saddle"]
    CARD_FIELD_NUMBER: ClassVar[int]
    CHARA_FIELD_NUMBER: ClassVar[int]
    RACE_INSTANCE_FIELD_NUMBER: ClassVar[int]
    SKILL_FIELD_NUMBER: ClassVar[int]
    SPECIAL_CASE_RACE_FIELD_NUMBER: ClassVar[int]
    STORY_FIELD_NUMBER: ClassVar[int]
    SUCCESSION_RELATION_FIELD_NUMBER: ClassVar[int]
    SUPPORT_CARD_FIELD_NUMBER: ClassVar[int]
    TEAM_STADIUM_SCORE_BONUS_FIELD_NUMBER: ClassVar[int]
    VERSION_FIELD_NUMBER: ClassVar[int]
    WINS_SADDLE_FIELD_NUMBER: ClassVar[int]
    card: _containers.RepeatedCompositeFieldContainer[Card]
    chara: _containers.RepeatedCompositeFieldContainer[Chara]
    race_instance: _containers.RepeatedCompositeFieldContainer[RaceInstance]
    skill: _containers.RepeatedCompositeFieldContainer[Skill]
    special_case_race: _containers.RepeatedCompositeFieldContainer[SpecialCaseRace]
    story: _containers.RepeatedCompositeFieldContainer[Story]
    succession_relation: _containers.RepeatedCompositeFieldContainer[SuccessionRelation]
    support_card: _containers.RepeatedCompositeFieldContainer[SupportCard]
    team_stadium_score_bonus: _containers.RepeatedCompositeFieldContainer[TeamStadiumScoreBonus]
    version: str
    wins_saddle: _containers.RepeatedCompositeFieldContainer[WinsSaddle]
    def __init__(self, version: Optional[str] = ..., chara: Optional[Iterable[Union[Chara, Mapping]]] = ..., card: Optional[Iterable[Union[Card, Mapping]]] = ..., support_card: Optional[Iterable[Union[SupportCard, Mapping]]] = ..., succession_relation: Optional[Iterable[Union[SuccessionRelation, Mapping]]] = ..., race_instance: Optional[Iterable[Union[RaceInstance, Mapping]]] = ..., wins_saddle: Optional[Iterable[Union[WinsSaddle, Mapping]]] = ..., special_case_race: Optional[Iterable[Union[SpecialCaseRace, Mapping]]] = ..., skill: Optional[Iterable[Union[Skill, Mapping]]] = ..., team_stadium_score_bonus: Optional[Iterable[Union[TeamStadiumScoreBonus, Mapping]]] = ..., story: Optional[Iterable[Union[Story, Mapping]]] = ...) -> None: ...

class WinsSaddle(_message.Message):
    __slots__ = ["group_id", "id", "name", "priority", "race_instance_id"]
    GROUP_ID_FIELD_NUMBER: ClassVar[int]
    ID_FIELD_NUMBER: ClassVar[int]
    NAME_FIELD_NUMBER: ClassVar[int]
    PRIORITY_FIELD_NUMBER: ClassVar[int]
    RACE_INSTANCE_ID_FIELD_NUMBER: ClassVar[int]
    group_id: int
    id: int
    name: str
    priority: int
    race_instance_id: _containers.RepeatedScalarFieldContainer[int]
    def __init__(self, id: Optional[int] = ..., name: Optional[str] = ..., race_instance_id: Optional[Iterable[int]] = ..., priority: Optional[int] = ..., group_id: Optional[int] = ...) -> None: ...
