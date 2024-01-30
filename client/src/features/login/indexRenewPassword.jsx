import { Fragment, useEffect, useState } from 'react';
import ModalLoading from '../../components/loading/loadingModal';
import imageLogo from '../../assets/images/loginPrincipal.png';
import { Row, Col, Form, Button, Container, Image, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";
import { url } from "../../globals";
import { useNavigate  } from 'react-router-dom';

const initialForm = {
    userName: ""
};

export default function RenewPassword() {
	const [getForm, setForm] = useState(initialForm);
    const [getShow, setShow] = useState(false);
    const navigate  = useNavigate ();

    const handleChangeForm = (e) => {
		setForm({
		  ...getForm,
		  [e.name]: e.value,
		});
	};

    async function sendForm(e){
        e.preventDefault();
        setShow(true);

        axios.post(`${url}/users/renewAccount`, { user: getForm.userName } )
            .then((response) => {
                Swal.fire(response.data.message)
                .finally(() => {
                    setForm({
                        ...getForm,
                        userName: ""
                    });
                    setShow(false);

                    navigate('/login');
                })
            })
            .catch((response) => {
                Swal.fire(response.response.data.message)
                .finally(() => {
                    setShow(false);
                })
            });
    }

    return(
        <Fragment>
            <Container>
            <Card border='0' className='m-5 shadow-lg'>
                <Row className='justify-content-center'>
                    <Col lg='6' md='6' sm='12'>
                        <Container fluid style={{height: '100%'}} className='justify-content-center p-5'>
                            <h1 class='text-center'>Recuperar contraseña</h1>
                            <Form fluid style={{height: '100%'}} className='justify-content-center p-3' onSubmit={ sendForm }>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Dirección email</Form.Label>
                                    <Form.Control size="lg" type="email" placeholder="Ingrese email" name="userName" onChange={(e) => handleChangeForm(e.target)} value={getForm.userName} required autoComplete='off'/>
                                        <Form.Text className="text-muted">
                                            Ingresa tu correo electronico para recuperar tu contraseña.
                                        </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Row>
                                        <Button size="lg" variant="outline-primary btn-block" type="submit" block>
                                            Recuperar contraseña
                                        </Button>
                                    </Row>
                                </Form.Group>
                                <p>
                                    Ya tienes una cuenta <span><a href='/login'>ingresa por aquí</a></span>
                                </p>
                            </Form>
                        </Container>
                    </Col>
                    <Col lg='6' md='6' sm='12' className='p-5'>
                        <Container>
                            <Image src={ imageLogo } fluid />
                        </Container>
                    </Col>
                </Row>
            </Card>
            </Container>
            {getShow && (
                <ModalLoading 
                    stateShow = { getShow }
                />
            )}
        </Fragment>
    );
}