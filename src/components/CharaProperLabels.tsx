import _ from "lodash";
import React from "react";
import {Table} from "react-bootstrap";
import {TrainedCharaData} from "../data/TrainedCharaData";
import * as UMDatabaseUtils from "../data/UMDatabaseUtils";

type CharaProperLabelsProps = {
    chara: TrainedCharaData,
}

export default function CharaProperLabels(props: CharaProperLabelsProps) {
    return <Table size="small" className="w-auto m-2">
        <tbody>
        <tr>
            <td>芝</td>
            <td>{UMDatabaseUtils.charaProperLabels[props.chara.properGroundTurf]}</td>
            <td>ダート</td>
            <td>{UMDatabaseUtils.charaProperLabels[props.chara.properGroundDirt]}</td>
        </tr>
        <tr>
            {_.map(UMDatabaseUtils.distanceLabels, (name, key: number) => <>
                <td>{name}</td>
                <td>{UMDatabaseUtils.charaProperLabels[props.chara.properDistances[key]]}</td>
            </>)}
        </tr>
        <tr>
            {_.map(UMDatabaseUtils.runningStyleLabels, (name, key: number) => <>
                <td>{name}</td>
                <td>{UMDatabaseUtils.charaProperLabels[props.chara.properRunningStyles[key]]}</td>
            </>)}
        </tr>
        </tbody>
    </Table>;
}
