import axios from "axios";
import { NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_DELETE_FAIL, NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTES_UPDATE_FAIL, NOTES_UPDATE_REQUEST, NOTES_UPDATE_SUCCESS } from "../constants/notesConstants";


//? FETCHING ALL NOTES
export const listNotes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTES_LIST_REQUEST,
        })

        // const { userLogin: { userInfo } } = getState();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get('/api/notes', config);

        dispatch({
            type: NOTES_LIST_SUCCESS,
            payload: data,
        })

        console.log("I RUN");

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: NOTES_LIST_FAIL,
            payload: message,
        })
    }
}

//? CREATE
export const createNoteAction = (title, content, category) => (dispatch, getState) => {
    try {
        dispatch({
            type: NOTES_CREATE_REQUEST,
        })

        // const { userLogin: { userInfo } } = getState()
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = axios.post('/api/notes/create', { title, content, category }, config)

        dispatch({
            type: NOTES_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: NOTES_CREATE_FAIL,
            payload: message,
        })
    }
}

//? UPDATE
export const updateNoteAction = (id, title, content, category) => (dispatch, getState) => {
    try {
        dispatch({
            type: NOTES_UPDATE_REQUEST
        });

        // const { userLogin: { userInfo } } = getState()
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = axios.put(`/api/notes/${id}`, { title, content, category }, config)

        dispatch({
            type: NOTES_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: NOTES_UPDATE_FAIL,
            payload: message,
        })
    }
}

//? DELETE
export const deleteNoteAction = (id) => (dispatch, getState) => {
    try {
        dispatch({
            type: NOTES_DELETE_REQUEST,
        })

        // const { userLogin: { userInfo } } = getState();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = axios.delete(`/api/notes/${id}`, config)

        dispatch({
            type: NOTES_DELETE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: NOTES_DELETE_FAIL,
            payload: message,
        })

    }
}