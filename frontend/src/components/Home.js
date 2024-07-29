import NavBar from "./NavBar";
import { useState, useEffect } from 'react';
import {Form, ButtonToolbar, Button, Input, Notification, useToaster, SelectPicker } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

function Home() {
    const navigate = useNavigate();
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        getReminders()
    }, [])

    const getReminders = async() => {
        const response = await fetch("http://localhost:8080/reminder-api/all")
        setReminders(await response.json())
    }

    const handleReminderClick = (id) => {
        navigate(`/view/${id}`)
    }
    
    return (
        <Container>
            <NavBar/>
            <Row>
                <Col>
                    <h1>Welcome to Thoughtful</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    {reminders.map((data) => {
                        return(
                            <div>
                            <li key={data.id}>{data.id} - {data.title} - <Button onClick={() => handleReminderClick(data.id)} appearance="primary">Edit</Button></li>
                            
                            </div>
                        )
                    })}
                </Col>
            </Row>
        </Container>
    )
}

export default Home;