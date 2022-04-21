import { GET_POST, GET_POSTS, ADD_POST, UPDATE_LIKES, DELETE_POST, POST_ERROR, ADD_COMMENT,  DELETE_COMMENT } from "../actions/types"

const initialState = {
    post: '',
    posts: [],
    loading: true,
    error: ''
}

export const post = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_POST:
        case ADD_POST:
            return {
                ...state,
                post: payload,
                loading: false,
            };
            // case ADD_POST:
            //     return {
            //         ...state,
            //         posts: [...state.posts, payload],
            //         loading: false,
            //     };
            case GET_POSTS:
                return {
                ...state,
                posts: payload,
                loading: false,
            };

        case UPDATE_LIKES:
            let newPosts = [...state.posts];
            const position = newPosts.findIndex(post => post._id === payload.id)
            console.log(position);
            newPosts.splice(position, 1, payload.likes)
            console.log(newPosts);
            return {
                ...state,
                posts: newPosts,
                loading: false,
            };

            case ADD_COMMENT:
                let allPost = [...state.posts];
            const findPost = allPost.findIndex(post => post._id === payload.id)
            console.log(findPost);
          allPost.splice(findPost, 1, payload.comment)
          console.log(allPost);
            return {
                ...state,
                posts: allPost,
                loading: false,
            };

        case DELETE_COMMENT:           
                return {
                    ...state,
                    posts: payload,
                    loading: false,
                };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false,

            };
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                error: payload

            };


        default: return state

    }
}