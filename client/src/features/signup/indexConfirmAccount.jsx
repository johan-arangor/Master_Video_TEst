import { Fragment } from 'react';
import { Container, Row, Button, Form, Card, Col, Image } from 'react-bootstrap';
import imageLogo from '../../assets/images/confirmPrincipal.png';
import { url } from "../../globals";
import Swal from "sweetalert2";
import axios from 'axios';

export default function ConfirmAccount() {
    const urlPathName = window.location.pathname;

    createUser(urlPathName);

    async function createUser(urlPathName){
        axios.get(`${url}/users${urlPathName}`)
            .then((response) => {
                Swal.fire(response.data.message);
            })
            .catch((error) => {
                Swal.fire(error.response.data.message);
            })
    }

    return (
        <Fragment>
            <Container>
                <Card border='0' className='m-5 shadow-lg card text-center'>
                    <Row className='justify-content-center'>
                        <Col lg='6' md='6' sm='12'>
                            <Container fluid style={{height: '100%'}} className='justify-content-center p-5'>
                                <h1>Confirmación de cuenta</h1>
                                <p>
                                    Se ha confirmado tu cuenta, por favor ingresa
                                </p>
                                <Row>
                                    <Button size="lg" variant="outline-primary btn-block" href='/login' block>
                                        Ingresar
                                    </Button>
                                </Row>
                            </Container>
                        </Col>
                        <Col lg='6' md='6' sm='12' className='p-5'>
                            <Container>
                                <Image src={ imageLogo } fluid rounded />
                            </Container>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </Fragment>
    );
}