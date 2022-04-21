import {combineReducers} from 'redux'
import {alert} from './alertReducer'
import {auth} from './authReducer'
import {profile} from './profileReducer'
import {post} from './postReducer'


export const rootReducer = combineReducers({
   alert,
   auth,
   profile,
   post
})