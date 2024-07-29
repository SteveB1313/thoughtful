import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
    }

    const handleReminderClick = () => {
        navigate("/reminder");
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand onClick={handleHomeClick}>
                Thoughtful
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
                <Nav.Link onClick={handleReminderClick}>Reminder</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;