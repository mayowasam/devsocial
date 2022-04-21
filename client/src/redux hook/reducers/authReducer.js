import { SIGNUP_SUCCESS, SIGNUP_FAILURE,LOGIN_SUCCESS, LOGIN_FAILURE, USER_LOADED ,AUTH_ERROR, LOGOUT, DELETE_ACCOUNT} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: "",
}



export const auth = (state =initialState, action) => {
    switch(action.type){
        case SIGNUP_SUCCESS: 
         case LOGIN_SUCCESS:
       localStorage.setItem("token", action.payload)
        return { 
            ...state ,
            ...action.payload,
            token: localStorage.getItem('token'),
            isAuthenticated: true,
            loading: false,
        };
        case SIGNUP_FAILURE: 
        case LOGIN_FAILURE:
        case AUTH_ERROR: 
        case DELETE_ACCOUNT:
        case LOGOUT:
        localStorage.removeItem("token")
        return {
            ...state ,
            token: "",
            isAuthenticated: false,
            loading: false,
        };
        case USER_LOADED: 
        return {
            ...state ,
            isAuthenticated: true,
            loading: false,
            user: action.payload
        };
       

        default: return state
    }
}