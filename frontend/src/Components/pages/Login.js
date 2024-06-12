import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, NavLink, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useLoginMutation} from '../../services/appApi'
import './Signup.css'
import { useDispatch } from 'react-redux'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [login,{isError,isLoading,error}] =useLoginMutation()
    const dispatch = useDispatch();
    function handleLogin(e) {
        e.preventDefault();
        login({email,password});
    }

    return (
        <Container>
            <Row>
                <Col md={6} className='login-form--container'>
                    <Form style={{ width: '100%' }} onSubmit={handleLogin}>
                        <h1>Login to Your Account</h1>
                        {isError && <Alert variant='danger'>{error.data.message}</Alert>}
                        <Form.Group className='mb-3'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email Address' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Your Password' value={password} onChange={(e) => setpassword(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Button type='submit' disabled={isLoading}>Login</Button>
                        </Form.Group>
                        <p>Don't Have an Account ? <Link to='/signup'>Create Account</Link></p>
                    </Form>
                </Col>
                <Col md={6} className='signUp_image-container'></Col>
            </Row>
        </Container>
    )
}

export default Login
