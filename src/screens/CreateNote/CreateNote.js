import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { createNoteAction } from '../../actions/noteActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen'

const CreateNote = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const noteCreate = useSelector((state) => state.noteCreate);
    const { loading, error, note } = noteCreate;

    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!title || !content || !category) return;
        dispatch(createNoteAction(title, content, category));

        resetHandler();
        navigate('/mynotes')
    }


    return (
        <MainScreen title="Create a note">
            <Card>
                <Card.Header>Create a note</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
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
                        {loading && <Loading />}
                        <Button type='submit' variant="primary">Create Note</Button>
                        <Button variant="danger" className='mx-2' onClick={resetHandler}>Reset Fields</Button>
                    </Form>
                </Card.Body>
            </Card>
        </MainScreen>
    )
}

export default CreateNote
