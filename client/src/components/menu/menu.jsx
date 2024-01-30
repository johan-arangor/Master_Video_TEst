import { Fragment } from "react";
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';

export default function Menu(){
    return(
        <Fragment>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Videos App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Mi Area</Nav.Link>
                        <NavDropdown title="Videos" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/myVideos">Mis Videos</NavDropdown.Item>
                            <NavDropdown.Item href="#myColaborations">Mis Colaboraciones</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#upLoadVideo">Subir Video</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
}