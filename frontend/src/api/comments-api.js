import { serviceURL } from './api'
import { auth } from './api'
import { guid } from '../util'

export function getCommentCountForPostApi(postId){
    const commentsURL = `${serviceURL}/posts/${postId}/comments`
    return fetch( commentsURL, {method:"GET", headers:auth()})
            .then(res => res.json())    
}

export function getCommentsForPostApi(postId){
    const commentsURL = `${serviceURL}/posts/${postId}/comments`
    return fetch( commentsURL, {method:"GET", headers:auth()})
            .then(res => res.json())    
}

export function getCommentByIdApi(commentId){
    const postURL = `${serviceURL}/comments/${commentId}`
    return fetch( postURL, {method:"GET", headers:auth()})
            .then(res => res.json())        
}

export function createCommentApi(comment){
    const data = {
        id: guid(),
        timestamp: Date.now(),
        parentId: comment.parentId,
        body: comment.body,
        author: comment.author,     
    }

    const createPostURL = `${serviceURL}/comments`
    return fetch( createPostURL, 
                {
                    method:"POST", 
                    headers:auth(), 
                    body:JSON.stringify(data)
                })
        .then(res => res.json())
}

export function updateCommentApi(comment){
    const data = {
        id: comment.id,
        timestamp: Date.now(),
        parentId: comment.parentId,
        body: comment.body,
        author: comment.author,
    }

    const updatePostURL = `${serviceURL}/comments/${comment.id}`
    return fetch( updatePostURL, 
                {
                    method:"PUT", 
                    headers:auth(), 
                    body:JSON.stringify(data)
                })
        .then(res => res.json())
}

export function registerCommentVoteApi(commentId, voteType){
    console.log("registerCommentVoteApi ", voteType)
    const commentURL = `${serviceURL}/comments/${commentId}`
    return fetch( commentURL, {
                    method:"POST", 
                    headers:auth(), 
                    body:JSON.stringify({option: voteType})
                })
            .then(res => res.json())        
}

export function deleteCommentApi(commentId){
    const deleteCommentURL = `${serviceURL}/comments/${commentId}`
    return fetch( deleteCommentURL, 
        {
            method:"DELETE", 
            headers:auth(), 
        })
    .then(res => res.json())
}
