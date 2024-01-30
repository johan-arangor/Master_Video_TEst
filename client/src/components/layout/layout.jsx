import { Fragment, useEffect } from 'react';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import { Container } from 'react-bootstrap';
import global from '../../globals';

export default function Layout(props) {
    return (
      <Fragment>
        {global.token && (
          <Menu />
        )}
          <Container fluid style={{height: '100%'}} className='justify-content-md-center p-5'>
            {props.children}
          </Container>
        <Footer />
      </Fragment>
    );
}