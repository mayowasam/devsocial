import { setAlert, removeAlert } from './alertCreator'
import axios from 'axios'
import { GET_PROFILE,PROFILES, CREATE_PROFILE,UPDATE_PROFILE,GET_REPOS, PROFILE_ERROR,CLEAR_PROFILE, DELETE_ACCOUNT } from './types'
import { authHeader } from '../../utils/setAuthHeader';

export const clearprofile = () => ({
    type: CLEAR_PROFILE,

})


//Api calls
export const getprofile = async (dispatch) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    try {
        const { data } = await axios.get('http://localhost:5000/api/profile/me')
        //  console.log(data.user);
        dispatch({
            type: GET_PROFILE,
            payload: data.user
        })
    } catch (error) {
        // console.log(error.response.data)
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}


export const getallprofile = async (dispatch) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    try {
        const { data } = await axios.get(`http://localhost:5000/api/profile`)
        //  console.log(data.user);
        dispatch({
            type: PROFILES,
            payload: data.user
        })
    } catch (error) {
        // console.log(error.response.data)
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const getprofilebyid = async (id, dispatch) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    try {
        const { data } = await axios.get(`http://localhost:5000/api/profile/${id}`)
        //  console.log(data.user);
        dispatch({
            type: GET_PROFILE,
            payload: data.user
        })
    } catch (error) {
        // console.log(error.response.data)
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const getgithub = async (dispatch, username) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    try {
        const { data } = await axios.get(`http://localhost:5000/api/profile/github/${username}`)
        //  console.log(data.user);
        dispatch({
            type: GET_REPOS,
            payload: data.user
        })
    } catch (error) {
        // console.log(error.response)
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}
export const createprofile = async (formData, dispatch, edit = false, navigate) => {
    if (localStorage.token) {
        // console.log('gp',localStorage.token);
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    try {
        const { data } = await axios.post('http://localhost:5000/api/profile/create', JSON.stringify(formData), config)
        //  console.log(data.profile);
        dispatch({
            type: CREATE_PROFILE,
            payload: data.profile
        })
        dispatch(setAlert(edit ? "Profile Updated" : "Profile Saved", "success"))
        setTimeout(() => dispatch(removeAlert()), 2000);

        if (!edit) {
            navigate('/dashboard')
        }



    } catch (error) {
        // console.log(error.response.data)
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
        dispatch(setAlert(error.response.statusText, "danger"))
        setTimeout(() => dispatch(removeAlert()), 2000);
    }
}


export const addExperience = async (formData, dispatch, navigate) => {
    if (localStorage.token) {
        // console.log('gp',localStorage.token);
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    try {
        const { data } = await axios.put('http://localhost:5000/api/profile/experience', JSON.stringify(formData), config)
        // console.log(data.profile);
         dispatch({
             type: UPDATE_PROFILE,
             payload: data.profile
         })
         dispatch(setAlert("Profile Updated", "success"))
         setTimeout(() => dispatch( removeAlert()), 2000);
         navigate('/dashboard')

    } catch (error) {
        const errors = error.response.data.errors
        // console.log(errors)
        errors.forEach(err =>  {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.msg,
                }
            })
              
        dispatch(setAlert(err.msg, "danger"))
        setTimeout(() => dispatch(removeAlert()), 2000);
        })
      
    }
}

export const addEducation = async (formData, dispatch, navigate) => {
    if (localStorage.token) {
        // console.log('gp',localStorage.token);
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    try {
        const { data } = await axios.put('http://localhost:5000/api/profile/education', JSON.stringify(formData), config)
        // console.log(data.profile);
         dispatch({
             type: UPDATE_PROFILE,
             payload: data.profile
         })
         dispatch(setAlert( "Profile Updated", "success"))
         setTimeout(() => dispatch( removeAlert()), 2000);

         navigate('/dashboard')

    } catch (error) {
        const errors = error.response.data.errors
        // console.log(errors)
        errors.forEach(err =>  {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.msg,
                }
            })
              
        dispatch(setAlert(err.msg, "danger"))
        setTimeout(() => dispatch(removeAlert()), 2000);
        })
      
    }
}


export const deleteexperience = async (id, dispatch, navigate) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    try {
        const { data } = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`, config)
        // console.log(data.profile);
          dispatch({
            type: UPDATE_PROFILE,
            payload: data.profile
        })
         dispatch(setAlert( "Education Deleted", "success"))
         setTimeout(() => dispatch( removeAlert()), 2000);
navigate('/dashboard')


    } catch (error) {
        const errors = error.response.data.errors
        // console.log(errors)
        errors.forEach(err =>  {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.msg,
                }
            })
              
        dispatch(setAlert(err.msg, "danger"))
        setTimeout(() => dispatch(removeAlert()), 2000);
        })
      
    }
}

export const deleteeducation = async (id, dispatch, navigate) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    try {
        const { data } = await axios.delete(`http://localhost:5000/api/profile/education/${id}`, config)
        // console.log(data.profile);
        dispatch({
            type: UPDATE_PROFILE,
            payload: data.profile
        })
         dispatch(setAlert( "Education Deleted", "success"))
         setTimeout(() => dispatch( removeAlert()), 2000);
         navigate('/dashboard')



    } catch (error) {
        const errors = error.response.data.errors
        // console.log(errors)
        errors.forEach(err =>  {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.msg,
                }
            })
              
        dispatch(setAlert(err.msg, "danger"))
        setTimeout(() => dispatch(removeAlert()), 2000);
        })
      
    }
}

export const deleteaccount= async (dispatch, navigate) => {
    if (localStorage.token) {
        authHeader(localStorage.token)
    }

if(window.confirm("Are you Sure")) {
    
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    try {
       await axios.delete(`http://localhost:5000/api/profile/delete`, config)
        dispatch(clearprofile)
        dispatch({
            type:DELETE_ACCOUNT   
        })
         dispatch(setAlert( "Account Deleted", "success"))
         setTimeout(() => dispatch( removeAlert()), 2000);
         navigate('/')
    
    
    
    } catch (error) {
        const errors = error.response.data.errors
        // console.log(errors)
        errors.forEach(err =>  {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.msg,
                }
            })
              
        dispatch(setAlert(err.msg, "danger"))
        setTimeout(() => dispatch(removeAlert()), 2000);
        })
      
    }
}

  
   
}

