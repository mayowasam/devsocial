import {GET_POSTS, GET_POST, ADD_POST, UPDATE_LIKES, ADD_COMMENT, DELETE_COMMENT, POST_ERROR, DELETE_POST} from './types'
import { setAlert, removeAlert } from './alertCreator'
import { authHeader } from '../../utils/setAuthHeader';
import axios from 'axios'


export const getPosts = async (dispatch) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    try {
        const {data} = await axios.get('http://localhost:5000/api/post', config)
        // console.log(data);
        dispatch({
            type: GET_POSTS,
            payload: data.post
        })
    } catch (error) {
        // console.log(error.response.data)
        dispatch({
            type: POST_ERROR,
            payload: error.response.statusText,
            
        })
    }
}


export const getPost = async (id, dispatch) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    try {
        const {data} = await axios.get(`http://localhost:5000/api/post/${id}`, config)
        // console.log(data);
        dispatch({
            type: GET_POST,
            payload: data.post
        })
    } catch (error) {
        // console.log(error.response.data)
        dispatch({
            type: POST_ERROR,
            payload: error.response.statusText,
            
        })
    }
}

export const addPost = async (formData, dispatch) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    try {
        console.log(formData );
        const data = await axios.post('http://localhost:5000/api/post', {text: formData}, config)
        // console.log(data);
        dispatch({
            type: ADD_POST,
            payload: data.post
        })
        dispatch(getPosts(dispatch))
    } catch (error) {
        // console.log(error.response)
        dispatch({
            type: POST_ERROR,
            // payload: error.response.statusText,
            
        })
    }
}


export const likePost = async (id, dispatch) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    try {
        const {data} = await axios.put(`http://localhost:5000/api/post/${id}`, config)
        // console.log(data);
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id,
                likes:data.post
            }
        })
    } catch (error) {
        // console.log(error.response.data)
        dispatch({
            type: POST_ERROR,
            payload: error.response.statusText,
            
        })
    }
}


export const addComment = async (formData, id, dispatch) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    try {
        const {data} = await axios.put(`http://localhost:5000/api/post/comment/${id}`,{text: formData}, config)
        // console.log(data);
        dispatch({
            type: ADD_COMMENT,
            payload: {
                id,
                comment:data.post
            }
        })
        dispatch(getPost(id,dispatch))  

    } catch (error) {
        // console.log(error.message)
        dispatch({
            type: POST_ERROR,
            payload: error.message
        })
    }

}



export const deletecomment = async (id, comment_id, dispatch) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    try {
        const {data} = await axios.delete(`http://localhost:5000/api/post/comment/${id}/${comment_id}`, config)
        // console.log(data);

        dispatch({
            type: DELETE_COMMENT,
            payload: data.post
            
        })
        dispatch(setAlert("comment Deleted", "success"))
        setTimeout(() => dispatch(removeAlert()), 2000);
        dispatch(getPost(id,dispatch))  

    } catch (error) {
        // console.log(error.message)
        dispatch({
            type: POST_ERROR,
            payload: error.message
            
            
        })
    }

}




export const deletepost = async (id, dispatch) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    try {
        const {data} = await axios.delete(`http://localhost:5000/api/post/${id}`, config)
        console.log(data);
        dispatch({
            type: DELETE_POST,
            payload: id
            
        })
        dispatch(setAlert("Post Deleted", "success"))
        setTimeout(() => dispatch(removeAlert()), 2000);
        
        dispatch(getPost(id,dispatch))  
    } catch (error) {
        // console.log(error.response.data)
        dispatch({
            type: POST_ERROR,
            payload: error.response.statusText,
            
        })
    }

}