import { Fragment } from 'react';
import misVideos from '../../assets/images/misVideos.png';
import videosReals from '../../assets/images/videosReals.png';
import '../../../src/assets/css/principal.css';

import { Container, Card, Row, Col, Image } from 'react-bootstrap';

export default function Principal() {
    return(
        <Fragment>
            <Container>
                <Card border='0' className='m-5 shadow-lg'>
                    <Card.Header className='text-center'>
                        <h1>Mis Videos</h1>
                    </Card.Header>
                    <Card.Title className='text-center'>
                        <h3>Menú Principal</h3>
                    </Card.Title>
                    <Row className='text-center'>
                        <Col md={6} sm={12}>
                            <Container className='buttonPpal misVideos'>
                                <Image src={ misVideos } fluid width={300} height={300} border='0' />
                            </Container>
                        </Col>
                        <Col md={6} sm={12}>
                            <Container className='buttonPpal videosReals'>
                                <Image src={ videosReals } fluid width={300} height={300} border='0' />
                            </Container>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </Fragment>
    );
}