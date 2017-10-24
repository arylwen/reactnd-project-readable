import { getPostsApi } from '../api/posts-api'
import { getPostsAction } from '../actions/posts-actions'
import { getPostByIdApi} from '../api/posts-api'
import { getPostByIdAction } from '../actions/posts-actions'
import { createPostApi} from '../api/posts-api'
import { createPostAction } from '../actions/posts-actions'
import { updatePostApi} from '../api/posts-api'
import { updatePostAction } from '../actions/posts-actions'
import { registerPostVoteApi} from '../api/posts-api'
import { registerPostVoteAction } from '../actions/posts-actions'
import { deletePostApi} from '../api/posts-api'
import { deletePostAction } from '../actions/posts-actions'

export function getPostsThunk(){
    return dispatch => {
        getPostsApi()
            .then( res =>{
                console.log("getPostsThunk ", res)
                dispatch(getPostsAction(res))
            })
    }
}

export function getPostByIdThunk(postId){
    return dispatch => {
        getPostByIdApi(postId)
            .then( res =>{
                console.log("getPostByIdThunk ", res)
                dispatch(getPostByIdAction(res))
            })
    }
}

export function createPostThunk(post){
    return dispatch => {
        createPostApi(post)
            .then( res =>{
                console.log("createPostThunk ", res)
                dispatch(createPostAction(res))
            })
    }
}

export function updatePostThunk(post){
    return dispatch => {
        updatePostApi(post)
            .then( res =>{
                console.log("updatePostThunk ", res)
                dispatch(updatePostAction(res))
            })
    }
}

export function registerPostVoteThunk(postId, voteType){
    return dispatch => {
        registerPostVoteApi(postId, voteType)
            .then( res =>{
                console.log("registerPostVoteThunk ", res)
                dispatch(registerPostVoteAction(res))
            })
    }
}

export function deletePostThunk(postId){
    return dispatch => {
        deletePostApi(postId)
            .then( res =>{
                console.log("deletePostThunk ", res)
                dispatch(deletePostAction(res))
            })
    }
}
