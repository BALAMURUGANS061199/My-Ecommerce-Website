import React, { useState } from 'react';
import { Col, Container, Row, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css'
import axios from 'axios'
import { useSignupMutation } from '../../services/appApi';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    function handleSignup(e) {
        e.preventDefault();

        signup({ name, email, password });

    }

    return (
        <Container>
            <Row>
                <Col md={6} className='signUp-form--container'>
                    <Form style={{ width: '100%' }} onSubmit={handleSignup}>
                        <h1>Create An Account</h1>
                        {isError && <Alert variant='danger'>{error.data.meessage}</Alert>}
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter your Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

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
                            <Button type='submit' disabled={isLoading}>Create Account</Button>
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
