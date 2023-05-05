import { faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Container from 'react-bootstrap/Container';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <>
      <NavbarBootstrap className='bg-main' variant="dark">
        <Container>
          <NavbarBootstrap.Brand href="/transactions">
            <FontAwesomeIcon className='me-2 fs-semibold' icon={faCookieBite} />
            <span className='fw-semibold'>Alan Resto</span>
          </NavbarBootstrap.Brand>
        </Container>
      </NavbarBootstrap>

      <NavbarBootstrap className='shadow py-0 bg-white'>
        <Container className={`d-flex justify-content-start flex-wrap`}>
          <Link to={'/'} 
            className={`py-2 px-4 border-2 
            ${pathname == '/' || pathname == '/foods' ? 'border-primary' : 'border-white text-dark'} border-bottom  text-decoration-none`}>Food</Link>

          <Link to={'/transactions'} 
            className={`py-2 px-4 border-2 
            ${pathname == '/transactions' ? 'border-primary' : 'border-white text-dark'} border-bottom text-decoration-none`}>Transactions</Link>

          <Link to={'/list-transactions'} 
            className={`py-2 px-4 border-2 
            ${pathname == '/list-transactions' ? 'border-primary' : 'border-white text-dark'}
             border-bottom text-decoration-none`}>List Transactions</Link>
        </Container>
      </NavbarBootstrap>
    </>
  )
}

export default Navbar