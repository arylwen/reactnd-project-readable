export const GET_POSTS = "GET_POSTS"
export const GET_POST_BY_ID = "GET_POST_BY_ID"
export const CREATE_POST = "CREATE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const REGISTER_POST_VOTE = "REGISTER_POST_VOTE"
export const SET_SORT_ORDER = "SET_SORT_ORDER"
export const DELETE_POST = "DELETE_POST" 

export function getPostsAction(posts){
    return {
        type: GET_POSTS,
        posts,
    }
}

export function getPostByIdAction(post){
    return {
        type: GET_POST_BY_ID,
        post
    }
}

export function createPostAction(post){
    return {
        type: CREATE_POST,
        post
    }
}

export function updatePostAction(post){
    return {
        type: UPDATE_POST,
        post
    }
}

export function registerPostVoteAction(post){
    return{
        type: REGISTER_POST_VOTE,
        post
    }
}

export function setSortOrderAction(sortOrder)
{
    return{
        type: SET_SORT_ORDER,
        sortOrder
    }
}

export function deletePostAction(post)
{
    return{
        type: DELETE_POST,
        post
    }
}