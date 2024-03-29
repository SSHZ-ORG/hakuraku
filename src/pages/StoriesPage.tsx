import React from "react";
import BootstrapTable, {ColumnDescription} from "react-bootstrap-table-next";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import {charaNameWithIdAndCast, Story, supportCardNameWithId} from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";


const columns: ColumnDescription<Story>[] = [
    {
        dataField: 'id',
        text: 'ID',
        filter: textFilter(),
    },
    {
        dataField: 'name',
        text: 'Name',
        filter: textFilter(),
    },
    {
        dataField: 'chara',
        isDummyField: true,
        text: 'Chara / Card',
        formatter: (cell, row) =>
            row.chara ? charaNameWithIdAndCast(row.chara) :
                row.supportCard ? supportCardNameWithId(row.supportCard) :
                    '',
    },
];

export default function StoriesPage() {
    return <>
        <BootstrapTable bootstrap4 condensed hover
                        classes="responsive-bootstrap-table"
                        wrapperClasses="table-responsive"
                        keyField="id"
                        data={UMDatabaseWrapper.stories}
                        columns={columns}
                        filter={filterFactory()}/>
    </>;
}
