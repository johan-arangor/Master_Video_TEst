import { Fragment, useEffect, useState } from 'react';
import imageLogo from '../../assets/images/loginPrincipal.png';
import { Row, Col, Form, Button, Container, Image, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";
import { url } from "../../globals";
import { useNavigate  } from 'react-router-dom';

const initialForm = {
    password: "",
    confirmPassword: ""
};

export default function ChangePassword() {
	const [getForm, setForm] = useState(initialForm);
    const [getTextPassword, setTextPassword] = useState(true);
    const [getToken, setToken] = useState(false);
    const navigate  = useNavigate ();
    const urlPathName = window.location.pathname.split('/');

    validateTokenUser(urlPathName);

    async function validateTokenUser(urlPathName){
        axios.get(`${url}/users/changePasswordLink/${urlPathName[2]}`)
            .then(() => {
                setToken(true);
            })
            .catch((error) => {
                Swal.fire(error.response.data.message);
            })
    }

    useEffect(() => {
        if ((getForm.password === getForm.confirmPassword) && 
            (getForm.password.length > 7 && getForm.confirmPassword.length > 7 )) {
            setTextPassword(false);
        } else {
            setTextPassword(true);
        }
    }, [getForm.password, getForm.confirmPassword])

    const handleChangeForm = (e) => {
		setForm({
		  ...getForm,
		  [e.name]: e.value,
		});
	};

    const NotToken = () => {
        return(                    
            <>
                <Col lg='12' md='12' sm='12' className='p-5'>
                    <h1 class='text-center'>Cambio de contraseña</h1>
                    <h1 class='text-center'>Token invalido o vencido</h1>
                    <p className='text-center'>
                        El token está vencido solicite de nuevo una contraseña <span><a href='/renewPassword'>solicitela aquí</a></span>
                    </p>
                    <Container>
                        <Image src={ imageLogo } fluid />
                    </Container>
                </Col>
            </>
        );
    }

    const ValidToken = () => {
        return(
            <>
                <Col lg='6' md='6' sm='12'>
                    <Container fluid style={{height: '100%'}} className='justify-content-center p-5'>
                        <h1 class='text-center'>Cambiar contraseña</h1>
                        <Form fluid style={{height: '100%'}} className='justify-content-center p-3' onSubmit={ sendForm }>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control size="lg" type="password" placeholder="Contraseña" name="password" min={8} onChange={(e) => handleChangeForm(e.target)} value={getForm.password} required/>
                                    <Form.Text className="text-muted">
                                        La cntraseña debe tener 8 caractere mínimo
                                    </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirmar Contraseña</Form.Label>
                                <Form.Control size="lg" type="password" placeholder="Confirmar Contraseña" name="confirmPassword" onChange={(e) => handleChangeForm(e.target)} value={getForm.confirmPassword} required/>
                                    <Form.Text style={{color: 'red'}}>
                                        {getTextPassword && ('Las contraseñas no oinciden')}
                                    </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Row>
                                    <Button size="lg" variant="outline-primary btn-block" type="submit" disabled={getTextPassword} block>
                                        Cambiar contraseña
                                    </Button>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Container>
                </Col>
                <Col lg='6' md='6' sm='12' className='p-5'>
                    <Container>
                        <Image src={ imageLogo } fluid />
                    </Container>
                </Col>
            </>
        );
    }
    async function sendForm(e){
        e.preventDefault();

        axios.post(`${url}/users/changePassword`, { password: getForm.password, token: urlPathName[2]} )
            .then((response) => {
                Swal.fire(response.data.message)
                .finally(() => {
                    setForm({
                        ...getForm,
                        password: "",
                        confirmPassword: ""
                    });

                    navigate('/login');
                })
            })
            .catch((response) => {
                Swal.fire(response.response.data.message)
            });
    }

    return(
        <Fragment>
            <Container>
            <Card border='0' className='m-5 shadow-lg'>
            <Row className='justify-content-center'>
                {!getToken ? (
                    <NotToken />
                ) : (
                    <ValidToken />
                )}
                </Row>
            </Card>
            </Container>
        </Fragment>
    );
}