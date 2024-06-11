import React, { useState } from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        // Handle form submission logic here
        console.log("Email:", email);
        console.log("Password:", password);
    }

    return (
        <Container>
            <Row>
                <Col md={6} className='signUp-form--container'>
                    <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <h1>Signup Form</h1>
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter your Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter Your Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group >
                        <Form.Group className='mb-3'>
                            <Button type='submit'>Create Account</Button>
                        </Form.Group>
                        <p>
                            Already Have an Account? <Link to='/login'>Please Login</Link>
                        </p>
                    </Form>
                </Col>
                <Col md={6} className='login__image--container'>
                    {/* You can add an image or any other content here */}
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;
