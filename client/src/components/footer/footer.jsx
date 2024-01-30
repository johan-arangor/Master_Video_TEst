import { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return(
        <Fragment>
            <Container class="text-center text-lg-start bg-white text-muted">
                <Container class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <Row>
                        <Col xs={12} md={10}>
                            <span>Conecta con nuestras redes sociales:</span>
                        </Col>
                        <Col xs={12} md={2}>
                            <Row>
                                <Col>
                                    <a href="" class="me-4 link-secondary">
                                        <i><FaFacebookF /></i>
                                    </a>
                                </Col>
                                <Col>
                                    <a href="" class="me-4 link-secondary">
                                        <i><FaInstagram /></i>
                                    </a>
                                </Col>
                                <Col>
                                    <a href="" class="me-4 link-secondary">
                                        <i><FaTwitter /></i>
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Fragment>
    );
}