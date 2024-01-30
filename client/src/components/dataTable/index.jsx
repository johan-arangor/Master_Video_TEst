import { Fragment } from "react";
import DataTable from 'react-data-table-component';

export default function DataTableComponent({ data, columns }){
    return(
        <Fragment>
            <DataTable
                columns={columns}
                data={data}
            />
        </Fragment>
    );
}