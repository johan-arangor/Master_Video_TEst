import React, { Fragment, useState } from 'react'
import { Modal, Container } from 'react-bootstrap';
import { FallingLines } from  'react-loader-spinner';
import '../../assets/css/loading.css';

export default function ModalLoading(stateShow) {
    const [getShow, setShow] = useState(stateShow);
    
    return(
        <Fragment>
            <Modal
                show={getShow}
                fullscreen={true}
            >
            <div class='principalLoading'>
                <div class='loadingGift'>
                    <FallingLines
                        color="#0d6efd"
                        width="100"
                        visible={true}
                        ariaLabel='falling-lines-loading'
                    />
                </div>
            </div>
            </Modal>
        </Fragment>
    );  
}