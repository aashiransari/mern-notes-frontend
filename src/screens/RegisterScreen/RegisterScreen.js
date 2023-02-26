import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import MainScreen from '../../components/MainScreen'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'


const RegisterScreen = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conpassword, setConpassword] = useState("")
    const [pic, setPic] = useState("https://unsplash.com/s/photos/profile")
    const [picMessage, setPicMessage] = useState(false)
    const [message, setMessage] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes')
        }
    }, [userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== conpassword) {
            setMessage('Passwords do no match');
        } else {
            dispatch(register(name, email, password, pic));
        }
    }

    const postDetails = (pics) => {

        if (!pics) {
            return setPicMessage("Please select an image");
        }
        // setPicMessage(null);

        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'noteZipper');
            data.append('cloud_name', 'ashir');
            // https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_faces/couple.jpg
            fetch('https://api.cloudinary.com/v1_1/ashir/image/upload/', {
                method: 'post',
                body: data,
            }).then((res) => res.json()).then((data) => {
                setPic(data.url.toString())
                console.log(data);
                console.log(pic);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            return setPicMessage("Please select an image");
        }
    }

    return (
        <MainScreen title='REGISTER'>
            <div className='container'>
                {loading && <Loading />}
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasiPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={conpassword} onChange={(e) => setConpassword(e.target.value)} />
                    </Form.Group>

                    {picMessage && <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>}
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control type="file" onChange={(e) => postDetails(e.target.files[0])} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Row className='py-3'>
                        <Col>
                            Already a Customer? <Link to='/login'>Login Here</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </MainScreen>
    )
}

export default RegisterScreen
