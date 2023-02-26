import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import MainScreen from '../../components/MainScreen'
import { updateProfile } from '../../actions/userActions'
import { USER_UPDATE_STATUS } from '../../constants/userConstants'

const ProfileScreen = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pic, setPic] = useState("")
    const [password, setPassword] = useState("")
    const [conpassword, setConpassword] = useState("")
    const [picMessage, setPicMessage] = useState("")
    const [picStatus, setPicStatus] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPic(userInfo.pic);
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: USER_UPDATE_STATUS })
        }, 2000);
    }, [success])

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
            setPicStatus(true);
            // https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_faces/couple.jpg
            fetch('https://api.cloudinary.com/v1_1/ashir/image/upload/', {
                method: 'post',
                body: data,
            }).then((res) => res.json()).then((data) => {
                setPic(data.url.toString())
                setPicStatus(false);
                console.log(data);
                console.log(pic);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            return setPicMessage("Please select an image");
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (password === conpassword) {
            dispatch(updateProfile({ name, password, pic }))
        }
    }

    return (
        <MainScreen title='EDIT PROFILE'>
            <div>
                <Row>
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {loading && <Loading />}
                            {success && <ErrorMessage variant='success'>Updated successfully</ErrorMessage>}
                            {picStatus && <ErrorMessage variant='warning'>Wait for the picture to display</ErrorMessage>}
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control readOnly type="email" placeholder="Enter email" value={email} />
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
                                <Form.Control type="file"
                                    onChange={(e) => postDetails(e.target.files[0])}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            style={{ width: '300px', borderRadius: "20px" }}
                            src={pic} alt={name} className="profilepic" />
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default ProfileScreen
