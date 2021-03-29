import {Base64} from "js-base64";
import gzip from "gzip-js";
import pb from './race_data_pb.js';
import struct from "@aksel/structjs";

const oneInt32 = struct('<i');
const oneFloat = struct('<f')

function deserializeHeader(buffer) {
    const header = new pb.RaceSimulateHeaderData();
    const [maxLength, version] = struct('<ii').unpack_from(buffer, 0);
    header.setMaxLength(maxLength).setVersion(version);
    return [header, 4 + maxLength];
}

function deserializeHorseFrame(buffer, offset) {
    const [distance, lanePosition, speed, hp, temptationMode, blockFrontHorseIndex] = struct('<fHHHbb').unpack_from(buffer, offset);
    return new pb.RaceSimulateHorseFrameData().setDistance(distance).setLanePosition(lanePosition)
        .setSpeed(speed).setHp(hp).setTemptationMode(temptationMode).setBlockFrontHorseIndex(blockFrontHorseIndex);
}

function deserializeFrame(buffer, offset, horseNum, horseFrameSize) {
    const frame = new pb.RaceSimulateFrameData().setTime(oneFloat.unpack_from(buffer, offset)[0]);
    offset += 4;
    for (let i = 0; i < horseNum; i++) {
        frame.addHorseFrame(deserializeHorseFrame(buffer, offset));
        offset += horseFrameSize;
    }
    return frame;
}

function deserializeHorseResult(buffer, offset) {
    const [finishOrder, finishTime, finishDiffTime, startDelayTime, gutsOrder, wizOrder, lastSpurtStartDistance, runningStyle, defeat, finishTimeRaw] = struct('<ifffBBfBif').unpack_from(buffer, offset);
    return new pb.RaceSimulateHorseResultData().setFinishOrder(finishOrder).setFinishTime(finishTime)
        .setFinishDiffTime(finishDiffTime).setStartDelayTime(startDelayTime).setGutsOrder(gutsOrder)
        .setWizOrder(wizOrder).setLastSpurtStartDistance(lastSpurtStartDistance).setRunningStyle(runningStyle)
        .setDefeat(defeat).setFinishTimeRaw(finishTimeRaw);
}

function deserializeEvent(buffer, offset) {
    const event = new pb.RaceSimulateEventData();
    const s = struct('<fbb');
    const [frameTime, type, paramCount] = s.unpack_from(buffer, offset);
    event.setFrameTime(frameTime).setType(type).setParamCount(paramCount);
    offset += s.size;
    for (let i = 0; i < paramCount; i++) {
        event.addParam(oneInt32.unpack_from(buffer, offset)[0]);
        offset += 4;
    }
    return event;
}

function deserialize(input) {
    const buffer = Uint8Array.from(input).buffer;

    const data = new pb.RaceSimulateData();

    let [header, offset] = deserializeHeader(buffer);
    data.setHeader(header);

    let s = struct('<fiii');
    const [distanceDiffMax, horseNum, horseFrameSize, horseResultSize] = s.unpack_from(buffer, offset);
    data.setDistanceDiffMax(distanceDiffMax).setHorseNum(horseNum).setHorseFrameSize(horseFrameSize).setHorseResultSize(horseResultSize);
    offset += s.size;

    data.setPaddingSize1(oneInt32.unpack_from(buffer, offset)[0]);
    offset += 4 + data.getPaddingSize1();

    s = struct('<ii')
    const [frameCount, frameSize] = s.unpack_from(buffer, offset);
    data.setFrameCount(frameCount).setFrameSize(frameSize);
    offset += s.size;

    for (let i = 0; i < frameCount; i++) {
        data.addFrame(deserializeFrame(buffer, offset, horseNum, horseFrameSize));
        offset += frameSize;
    }

    data.setPaddingSize2(oneInt32.unpack_from(buffer, offset)[0]);
    offset += 4 + data.getPaddingSize2();

    for (let i = 0; i < horseNum; i++) {
        data.addHorseResult(deserializeHorseResult(buffer, offset));
        offset += horseResultSize;
    }

    data.setPaddingSize3(oneInt32.unpack_from(buffer, offset)[0]);
    offset += 4 + data.getPaddingSize3();

    data.setEventCount(oneInt32.unpack_from(buffer, offset)[0]);
    offset += 4;

    for (let i = 0; i < data.getEventCount(); i++) {
        const eventWrapper = new pb.RaceSimulateData.EventDataWrapper().setEventSize(struct('<h').unpack_from(buffer, offset)[0]);
        offset += 2;
        eventWrapper.setEvent(deserializeEvent(buffer, offset));
        offset += eventWrapper.getEventSize();
        data.addEvent(eventWrapper);
    }

    return data;
}

function deserializeFromBase64(/** @type string */ input) {
    return deserialize(gzip.unzip(Base64.toUint8Array(input.trim('"'))));
}

export {deserialize, deserializeFromBase64};
