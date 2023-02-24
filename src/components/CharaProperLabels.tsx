import _ from "lodash";
import React, {PureComponent} from "react";
import {Table} from "react-bootstrap";
import {TrainedCharaData} from "../data/TrainedCharaData";
import UMDatabaseUtils from "../data/UMDatabaseUtils";

type CharaProperLabelsProps = {
    chara: TrainedCharaData,
}

export default class CharaProperLabels extends PureComponent<CharaProperLabelsProps> {
    render() {
        return <Table size="small" className="w-auto m-2">
            <tbody>
            <tr>
                <td>芝</td>
                <td>{UMDatabaseUtils.charaProperLabels[this.props.chara.properGroundTurf]}</td>
                <td>ダート</td>
                <td>{UMDatabaseUtils.charaProperLabels[this.props.chara.properGroundDirt]}</td>
            </tr>
            <tr>
                {_.map(UMDatabaseUtils.distanceLabels, (name, key: number) => <>
                    <td>{name}</td>
                    <td>{UMDatabaseUtils.charaProperLabels[this.props.chara.properDistances[key]]}</td>
                </>)}
            </tr>
            <tr>
                {_.map(UMDatabaseUtils.runningStyleLabels, (name, key: number) => <>
                    <td>{name}</td>
                    <td>{UMDatabaseUtils.charaProperLabels[this.props.chara.properRunningStyles[key]]}</td>
                </>)}
            </tr>
            </tbody>
        </Table>;
    }
}
