import React from 'react';
import { NavDropdown, Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Navigation.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/UserSlice';

function Navigations() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleLogout() {
    // dispatch(logout())
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>ECommerce</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* if No User*/}
            {!user && (
              <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}

            {/* if User*/}
            {user && (
              <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                {user.isAdmin && (
                  <>
                    <LinkContainer to='/Dashboard'>
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/new-product'>
                      <NavDropdown.Item>Create Product</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  </>
                )}

                {!user.isAdmin && (
                  <>
                    <LinkContainer to='/cart'>
                      <NavDropdown.Item>Cart</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/orders'>
                      <NavDropdown.Item>My Orders</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                <NavDropdown.Divider />
                <Button variant='danger' onClick={handleLogout} className='logout-btn'>Logout</Button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigations;
