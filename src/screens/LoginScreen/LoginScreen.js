import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../actions/userActions'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import MainScreen from '../../components/MainScreen'

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //getting user details from our store after login
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes');
        }
    }, [userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <MainScreen title='LOGIN'>
            <div className='container'>

                {loading && <Loading />}
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Row className='py-3'>
                        <Col>
                            New Customer? <Link to='/register'>Register Here</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </MainScreen>
    )
}

export default LoginScreen
