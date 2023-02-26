import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {

    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes')
        }
    }, [userInfo])


    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>Welcome to the Note Zipper</h1>
                            <p className='sub-title'>One safe place for all your notes.</p>
                        </div>
                        <div>
                            <div className='buttonContainer'>
                                <Link to="/login">
                                    <Button size='lg' className='landingbutton'>Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button size='lg' className='landingbutton' variant='outline-primary'>Signup</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage
