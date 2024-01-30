import React, { Fragment } from 'react'
import { FallingLines } from  'react-loader-spinner';

export default function Loading() {
    return(
        <Fragment>
            <FallingLines
                color="#0d6efd"
                width="40"
                visible={true}
                ariaLabel='falling-lines-loading'
            />
        </Fragment>
    );  
}