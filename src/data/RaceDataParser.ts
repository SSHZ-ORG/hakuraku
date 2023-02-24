// @ts-ignore
import struct from "@aksel/structjs";
import {Base64} from "js-base64";
import pako from "pako";
import {
    RaceSimulateData,
    RaceSimulateData_EventDataWrapper,
    RaceSimulateEventData,
    RaceSimulateFrameData,
    RaceSimulateHeaderData,
    RaceSimulateHorseFrameData,
    RaceSimulateHorseResultData,
} from "./race_data_pb";

const oneInt16 = struct('<h');

const oneInt32 = struct('<i');
const twoInt32s = struct('<ii');

const oneFloat = struct('<f');

function deserializeHeader(buffer: ArrayBuffer) {
    const [maxLength, version] = twoInt32s.unpack_from(buffer, 0);
    return [new RaceSimulateHeaderData({maxLength: maxLength, version: version}), 4 + maxLength];
}

const horseFrameStruct = struct('<fHHHbb');

function deserializeHorseFrame(buffer: ArrayBuffer, offset: number) {
    const [distance, lanePosition, speed, hp, temptationMode, blockFrontHorseIndex] = horseFrameStruct.unpack_from(buffer, offset);
    return new RaceSimulateHorseFrameData({
        distance: distance,
        lanePosition: lanePosition,
        speed: speed,
        hp: hp,
        temptationMode: temptationMode,
        blockFrontHorseIndex: blockFrontHorseIndex,
    });
}

function deserializeFrame(buffer: ArrayBuffer, offset: number, horseNum: number, horseFrameSize: number) {
    const frame = new RaceSimulateFrameData({time: oneFloat.unpack_from(buffer, offset)[0]});
    offset += 4;
    for (let i = 0; i < horseNum; i++) {
        frame.horseFrame.push(deserializeHorseFrame(buffer, offset));
        offset += horseFrameSize;
    }
    return frame;
}

const horseResultStruct = struct('<ifffBBfBif');

function deserializeHorseResult(buffer: ArrayBuffer, offset: number) {
    const [finishOrder, finishTime, finishDiffTime, startDelayTime, gutsOrder, wizOrder, lastSpurtStartDistance, runningStyle, defeat, finishTimeRaw] = horseResultStruct.unpack_from(buffer, offset);
    return new RaceSimulateHorseResultData({
        finishOrder: finishOrder,
        finishTime: finishTime,
        finishDiffTime: finishDiffTime,
        startDelayTime: startDelayTime,
        gutsOrder: gutsOrder,
        wizOrder: wizOrder,
        lastSpurtStartDistance: lastSpurtStartDistance,
        runningStyle: runningStyle,
        defeat: defeat,
        finishTimeRaw: finishTimeRaw,
    });
}

const eventStruct = struct('<fbb');

function deserializeEvent(buffer: ArrayBuffer, offset: number) {
    const [frameTime, type, paramCount] = eventStruct.unpack_from(buffer, offset);
    const event = new RaceSimulateEventData({
        frameTime: frameTime,
        type: type,
        paramCount: paramCount,
    });
    offset += eventStruct.size;
    for (let i = 0; i < paramCount; i++) {
        event.param.push(oneInt32.unpack_from(buffer, offset)[0]);
        offset += 4;
    }
    return event;
}

const raceStruct = struct('<fiii');

function deserialize(input: Uint8Array) {
    const buffer = input.buffer;

    let [header, offset] = deserializeHeader(buffer);
    const data = new RaceSimulateData({header: header});

    const [distanceDiffMax, horseNum, horseFrameSize, horseResultSize] = raceStruct.unpack_from(buffer, offset);
    data.distanceDiffMax = distanceDiffMax;
    data.horseNum = horseNum;
    data.horseFrameSize = horseFrameSize;
    data.horseResultSize = horseResultSize;
    offset += raceStruct.size;

    data.PaddingSize1 = oneInt32.unpack_from(buffer, offset)[0];
    offset += 4 + data.PaddingSize1!;

    let s = twoInt32s;
    const [frameCount, frameSize] = s.unpack_from(buffer, offset);
    data.frameCount = frameCount;
    data.frameSize = frameSize;
    offset += s.size;

    for (let i = 0; i < frameCount; i++) {
        data.frame.push(deserializeFrame(buffer, offset, horseNum, horseFrameSize));
        offset += frameSize;
    }

    data.PaddingSize2 = oneInt32.unpack_from(buffer, offset)[0];
    offset += 4 + data.PaddingSize2!;

    for (let i = 0; i < horseNum; i++) {
        data.horseResult.push(deserializeHorseResult(buffer, offset));
        offset += horseResultSize;
    }

    data.PaddingSize3 = oneInt32.unpack_from(buffer, offset)[0];
    offset += 4 + data.PaddingSize3!;

    data.eventCount = oneInt32.unpack_from(buffer, offset)[0];
    offset += 4;

    for (let i = 0; i < data.eventCount!; i++) {
        const eventWrapper = new RaceSimulateData_EventDataWrapper();
        eventWrapper.eventSize = oneInt16.unpack_from(buffer, offset)[0];
        offset += 2;
        eventWrapper.event = deserializeEvent(buffer, offset);
        offset += eventWrapper.eventSize;
        data.event.push(eventWrapper);
    }

    return data;
}

function deserializeFromBase64(input: string) {
    return deserialize(pako.inflate(Base64.toUint8Array(input)));
}

export {deserialize, deserializeFromBase64};
