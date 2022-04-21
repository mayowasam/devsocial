import { v4 as uuid } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './types'

let id = uuid()

export const setAlert = (msg, alertType) => {
    return {
        type: SET_ALERT,
        payload: {
            msg,
            alertType,
            id
        }

    }


}

export const removeAlert = () => ({
    type: REMOVE_ALERT,
    payload: id

})

