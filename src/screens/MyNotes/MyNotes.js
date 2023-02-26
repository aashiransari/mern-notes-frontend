import React, { useEffect } from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteNoteAction, listNotes } from '../../actions/noteActions'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import MainScreen from '../../components/MainScreen'
import { NOTES_DELETE_REQUEST, NOTES_DELETE_STATUS, NOTES_DELETE_STATUSS, NOTES_DELETE_SUCCESS } from '../../constants/notesConstants'


const MyNotes = ({ search }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const noteList = useSelector((state) => state.noteList)
    const { loading: loadingFetch, notes: notesFetch, error: errorFetch } = noteList;
    // const userLogin = useSelector((state) => state.userLogin);
    // const { userInfo } = userLogin;0

    //? check this -------------------------------------------------------------------
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // const noteUpdate = useSelector((state) => state.noteUpdate);
    // const { success: successUpdate } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure, you want to delete?")) {
            dispatch(deleteNoteAction(id));
        }
    }

    if (successDelete) {
        window.location.href = "/mynotes"
    }

    useEffect(() => {
        dispatch(listNotes());
        if (!userInfo) {
            navigate('/');
        }
    }, [successDelete])

    return (
        <MainScreen title={`Welcome Back ${userInfo.name}...`} >
            <Link to='/createnote'>
                <Button size='lg' style={{ marginLeft: "10px", marginBottom: "6px" }}>
                    Create Note
                </Button>
            </Link>
            {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
            {loadingDelete && <Loading />}
            {errorFetch && <ErrorMessage variant='danger'>{errorFetch}</ErrorMessage>}
            {loadingFetch && <Loading />}
            {
                notesFetch?.reverse().filter(filteredNote => (
                    filteredNote.title.toLowerCase().includes(search.toLowerCase())
                )).map((note) => (
                    <Card style={{ margin: 10 }} key={note._id}>
                        <Card.Header style={{ display: 'flex' }}>
                            <span
                                style={{
                                    color: 'black',
                                    textDecoration: 'none',
                                    flex: 1,
                                    cursor: 'pointer',
                                    alignself: 'center',
                                    fontSize: 18
                                }}
                            >
                                {note.title}
                            </span>
                            <div>
                                <Link to={`/note/${note._id}`}>
                                    <Button>
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant='danger' className='mx-2' onClick={() => deleteHandler(note._id)}>
                                    Delete
                                </Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <h4>
                                <Badge className='text-white bg-success'>
                                    Category - {note.category}
                                </Badge>
                            </h4>
                            <blockquote className="blockquote mb-0">
                                <p>{note.content}</p>
                                <footer className="blockquote-footer">
                                    Created on{" "}
                                    <cite title="Source-title">
                                        {note.createdAt.substring(0, 10)}
                                    </cite>
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                ))
            }
        </MainScreen>
    )
}

export default MyNotes
