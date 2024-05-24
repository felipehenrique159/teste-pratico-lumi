import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/cemig.png';
import { FaFilePdf, FaHome } from "react-icons/fa";

function NavBar() {
    return (
        <Navbar style={{backgroundColor: '#25804a'}} variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <img
                        src={logo}
                        width="130"
                        height="70"
                        className="d-inline-block align-top"
                        alt="Cemig Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className='text-decoration-none text-light mx-3'>
                            Inicio <FaHome />
                        </Link>
                        <Link to="/invoice-library" className='text-decoration-none mx-3 text-light'>
                            Biblioteca de faturas <FaFilePdf />
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
