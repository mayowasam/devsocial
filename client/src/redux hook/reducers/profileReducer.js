import { GET_PROFILE, CREATE_PROFILE, UPDATE_PROFILE, PROFILES, GET_REPOS, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types'

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}



export const profile = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
        case CREATE_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
            };
        case PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false,
            };

        case GET_REPOS:

            return {
                ...state,
                repos:  action.payload,
                loading: false,

            };
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            };

        case CLEAR_PROFILE:
            return {
                ...state,
                loading: false,
                repos: [],
                profile: null

            };

        default: return state
    }
}