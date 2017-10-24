import { getCommentCountForPostApi } from '../api/comments-api'
import { getCommentCountForPostAction } from '../actions/comments-actions'
import { getCommentsForPostApi } from '../api/comments-api'
import { getCommentsForPostAction } from '../actions/comments-actions'
import { getCommentByIdApi} from '../api/comments-api'
import { getCommentByIdAction } from '../actions/comments-actions'
import { createCommentApi} from '../api/comments-api'
import { createCommentAction } from '../actions/comments-actions'
import { updateCommentApi} from '../api/comments-api'
import { updateCommentAction } from '../actions/comments-actions'
import { registerCommentVoteApi} from '../api/comments-api'
import { registerCommentVoteAction } from '../actions/comments-actions'
import { deleteCommentApi} from '../api/comments-api'
import { deleteCommentAction } from '../actions/comments-actions'

export function getCommentCountForPostThunk(postId){
    return dispatch => {
        getCommentCountForPostApi(postId)           
            .then(res => {
                console.log("getCommentCountForPostThunk ", res)
                const comments = res.filter(comment => !comment.deleted);                
                dispatch(getCommentCountForPostAction(postId, comments.length))
            })
    }
}

export function getCommentsForPostThunk(postId){
    return dispatch => {
        getCommentsForPostApi(postId)           
            .then(res => {
                console.log("getCommentsForPostThunk ", res)
                const comments = res.filter(comment => !comment.deleted);                
                dispatch(getCommentsForPostAction(postId, comments))
            })
    }
}

export function getCommentByIdThunk(commentId){
    return dispatch => {
        getCommentByIdApi(commentId)
            .then( res =>{
                console.log("getCommentByIdThunk ", res)
                dispatch(getCommentByIdAction(res))
            })
    }
}

export function createCommentThunk(comment){
    return dispatch => {
        createCommentApi(comment)
            .then( res =>{
                console.log("createCommentThunk ", res)
                dispatch(createCommentAction(res))
            })
    }
}

export function updateCommentThunk(comment){
    return dispatch => {
        updateCommentApi(comment)
            .then( res =>{
                console.log("updateCommentThunk ", res)
                dispatch(updateCommentAction(res))
            })
    }
}

export function registerCommentVoteThunk(commentId, voteType){
    return dispatch => {
        registerCommentVoteApi(commentId, voteType)
            .then( res =>{
                console.log("registerCommentVoteThunk ", res)
                dispatch(registerCommentVoteAction(res))
            })
    }
}

export function deleteCommentThunk(commentId){
    return dispatch => {
        deleteCommentApi(commentId)
            .then( res =>{
                console.log("deleteCommentThunk ", res)
                dispatch(deleteCommentAction(res))
            })
    }
}
