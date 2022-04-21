import { SIGNUP_SUCCESS, SIGNUP_FAILURE,LOGIN_SUCCESS, LOGIN_FAILURE, USER_LOADED, AUTH_ERROR, LOGOUT} from './types'
import { setAlert, removeAlert } from './alertCreator'
import axios from 'axios'
import {authHeader} from '../../utils/setAuthHeader'




  

export const signUpSuccess = (data) => ({
    type: SIGNUP_SUCCESS,
    payload : data
})

export const signUpFailure = () => ({
    type: SIGNUP_FAILURE

})

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload : data
})

export const loginFailure = () => ({
    type: LOGIN_FAILURE

})

export const getUser = (data) => ({
        type: USER_LOADED, 
        payload: data

})

export const getUserError = () => ({
    type: AUTH_ERROR, 

})

export const logout = () => ({
    type: LOGOUT, 

})


//api calls

export const signup = async(formData, dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        const {data} = await axios.post('http://localhost:5000/api/user/signup', JSON.stringify(formData), config)
        dispatch( signUpSuccess(data.accessToken))
        dispatch(checkUser())

    } catch (error) {
        const errors = error.response.data.errors
        // console.log(errors);
        if(errors) {
            errors.map(err => dispatch(setAlert(err.msg, "danger")))
            setTimeout(() => dispatch( removeAlert()), 2000);

        }
        dispatch(signUpFailure())
    }
}

export const login = async(formData, dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        const {data} = await axios.post('http://localhost:5000/api/user/login', JSON.stringify(formData), config)
       console.log(data);
        dispatch( loginSuccess(data.accessToken))
        dispatch(checkUser())
    } catch (error) {
        const errors = error.response.data.errors
        // console.log(errors);
        if(errors) {
            errors.map(err => dispatch(setAlert(err.msg, "danger")))
            setTimeout(() => dispatch( removeAlert()), 2000);

        }
        dispatch(loginFailure())
    }
}

  
export const checkUser = () => async (dispatch) => {
    if(localStorage.token) {
        // console.log('ck',localStorage.token);
        authHeader(localStorage.token)
      }
    try {
        let res = await axios.get('http://localhost:5000/api/user')
        console.log("checkuser",res.data.user);
        dispatch(getUser(res.data.user))
  
    } catch (error) {
        // console.log(error.response.data.message);
        dispatch(getUserError())

    }
}

