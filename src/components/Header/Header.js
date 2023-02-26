import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';


const Header = ({ setSearch }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const userLogin = useSelector((state) => state.userLogin);
    // const { userInfo } = userLogin;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));


    const logoutHandler = () => {
        dispatch(logout());
        navigate('/')
    }

    return (
        <Navbar bg="primary" expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>Note Zipper</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='m-auto'>
                        <Form>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Form>
                    </Nav>
                    {userInfo ?
                        <Nav>
                            <Nav.Link as={Link} to='/mynotes'>My Notes</Nav.Link>
                            <NavDropdown title={`${userInfo?.name}`} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to='/profile'>My Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav> :
                        <Nav>
                            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                        </Nav>
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
