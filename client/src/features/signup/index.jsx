import { Fragment, useEffect, useState } from 'react';
import ModalLoading from '../../components/loading/loadingModal';
import imageLogo from '../../assets/images/loginPrincipal.png';
import { Row, Col, Form, Button, Container, Image, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";
import { url } from "../../globals";
import { useNavigate  } from 'react-router-dom';

const initialForm = {
    userName: "",
    password: "",
    confirmPassword: ""
};

export default function SignUp() {
	const [getForm, setForm] = useState(initialForm);
    const [getShow, setShow] = useState(false);
    const [getTextPassword, setTextPassword] = useState(true);
    const navigate  = useNavigate ();

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

    async function sendForm(e){
        e.preventDefault();
        setShow(true);

        axios.post(`${url}/users/signup`, { user: getForm.userName, password: getForm.password } )
            .then((response) => {
                Swal.fire(response.data.message)
                .finally(() => {
                    setForm({
                        ...getForm,
                        userName: "",
                        password: "",
                        confirmPassword: ""
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
                            <h1 class='text-center'>Registrarme</h1>
                            <Form fluid style={{height: '100%'}} className='justify-content-center p-3' onSubmit={ sendForm }>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Dirección email</Form.Label>
                                    <Form.Control size="lg" type="email" placeholder="Ingrese email" name="userName" onChange={(e) => handleChangeForm(e.target)} value={getForm.userName} required autoComplete='false'/>
                                        <Form.Text className="text-muted">
                                            Nunca compartiremos su correo electrónico con nadie más.
                                        </Form.Text>
                                </Form.Group>
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
                                            Registrarme
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
                            <Image src={ imageLogo } fluid rounded />
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