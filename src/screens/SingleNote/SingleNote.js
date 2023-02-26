import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { deleteNoteAction, updateNoteAction } from '../../actions/noteActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen'

const SingleNote = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { loading, error } = noteUpdate;

    // const userLogin = useSelector((state) => state.userLogin);
    // const { userInfo } = userLogin;

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${id}`, config);

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        }
        fetching();
        // eslint-disable-next-line
    }, [])

    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    }

    const updateHandler = (e) => {
        e.preventDefault();
        if (!title || !content || !category) return;
        dispatch(updateNoteAction(id, title, content, category));

        resetHandler();
        navigate('/mynotes')
    }

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure, you want to delete?")) {
            dispatch(deleteNoteAction(id));
        }
        navigate('/mynotes')
    }

    return (
        <MainScreen title="Edit note">
            <Card>
                <Card.Header>Edit your note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        <Form.Group className="mb-3" controlId="Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter the title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" placeholder="Enter the content" value={content} onChange={(e) => setContent(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
                        </Form.Group>

                        <blockquote className="blockquote mb-3">
                            <footer className="blockquote-footer">
                                Updated on{" "}
                                <cite title="Source-title">
                                    {date.substring(0, 10)}
                                </cite>
                            </footer>
                        </blockquote>

                        {loading && <Loading />}
                        <Button type='submit' variant="primary">Update Note</Button>
                        <Button variant="danger" className='mx-2'
                            onClick={() => deleteHandler(id)}
                        >Delete Note</Button>
                    </Form>
                </Card.Body>
            </Card>
        </MainScreen>
    )
}


export default SingleNote
