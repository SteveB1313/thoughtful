import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import {Form, ButtonToolbar, Button, Input, Notification, useToaster, SelectPicker } from 'rsuite';
import { useNavigate, useParams } from 'react-router-dom';

function View() {
    let id = useParams();
    console.log(id);
    let message = (
        <Notification type="success" header="Reminder created">
            <p>New reminder created</p>
        </Notification>
    )
    const toaster = useToaster();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        occurance: '',
        enabled: 'True'
    });

    useEffect(() => {
        getReminders()
    }, [])

    const getReminders = async() => {
        const response = await fetch(`http://localhost:8080/reminder-api/${id.id}`)
        setFormData(await response.json())
    }



    const checkForm = () => {
        if(formData.title === '' || formData.occurance === '') {
            return false;
        }
        return true;
    }

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleDelete = () => {
        console.log("delete")
    }

    const submitReminder = async(event) => {
        event.preventDefault();

        if (!checkForm()){
            alert("Missing form data");
            return ;
        }

        try {
            const response = await fetch(`http://localhost:8080/reminder-api/${id.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
        } catch(error) {
            console.log("Error: " + error);
            message = (
                <Notification type="error" header="Error">
                    <p>Error creating reminder</p>
                </Notification>
            )
        }

        navigate("/");
        toaster.push(message, {duration: 3000});
    }
    return (
        <div>
            <NavBar/>
            <div className="main-content">
                <Form>
                    <Form.Group controlId="title">
                        <Form.ControlLabel>Title</Form.ControlLabel>
                        <Form.Control name="title" value={formData.title} onChange={value => handleInputChange('title', value)}/>
                    </Form.Group>
                    <Form.Group controlId="occurance">
                        <Form.ControlLabel>Occurance</Form.ControlLabel>
                        <Form.Control name="occurance" value={formData.occurance} onChange={value => handleInputChange('occurance', value)}/>
                    </Form.Group>
                    <Form.Group>
                        <ButtonToolbar>
                            <Button onClick={submitReminder} appearance="primary">Submit</Button>
                            <Button onClick={handleDelete} appearance="default">Delete</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default View;