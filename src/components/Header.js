import Navbar from 'react-bootstrap/Navbar';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userAction';
const Header = (props) => {
    const [hideHeader, setHideHeader] = useState(false);
    // useEffect(() => {
    //     if (window.location.pathname === '/login') {
    //         setHideHeader(true);
    //     }
    // }, []);
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.account);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(handleLogoutRedux());
        // logout();
        // navigate('/');
        // toast.success('Log out succes');
    };
    useEffect(() => {
        if (user && user.auth === false && window.location.pathname !== '/login') {
            navigate('/');
            toast.success('Log out succes');
        }
    }, [user]);
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <span>React App</span>
                        <img
                            width="30"
                            height="30"
                            src={logoApp}
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {((user && user.auth) || window.location.pathname === '/') && (
                            <>
                                <Nav className="me-auto">
                                    <NavLink to="/" className="nav-link">
                                        Home
                                    </NavLink>
                                    <NavLink to="/users" className="nav-link">
                                        Manage User
                                    </NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.email && <span className="nav-link">Wellcome {user.email}</span>}
                                    <NavDropdown title="Setting">
                                        {user && user.auth === true ? (
                                            <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                        ) : (
                                            <NavLink to="/login" className="dropdown-item">
                                                Login
                                            </NavLink>
                                        )}
                                    </NavDropdown>
                                </Nav>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
