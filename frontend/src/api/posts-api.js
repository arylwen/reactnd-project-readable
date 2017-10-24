import { serviceURL } from './api'
import { auth } from './api'
import { guid } from '../util'

export function getPostsApi(){
    const postsURL = `${serviceURL}/posts/`
    return fetch( postsURL, {method:"GET", headers:auth()})
            .then(res => res.json())    
}

export function getPostByIdApi(postId){
    const postURL = `${serviceURL}/posts/${postId}`
    return fetch( postURL, {method:"GET", headers:auth()})
            .then(res => res.json())        
}

export function createPostApi(post){
    const data = {
        id: guid(),
        timestamp: Date.now(),
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category        
    }

    const createPostURL = `${serviceURL}/posts`
    return fetch( createPostURL, 
                {
                    method:"POST", 
                    headers:auth(), 
                    body:JSON.stringify(data)
                })
        .then(res => res.json())
}

export function updatePostApi(post){
    const data = {
        id: post.id,
        timestamp: Date.now(),
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category        
    }

    const updatePostURL = `${serviceURL}/posts/${post.id}`
    return fetch( updatePostURL, 
                {
                    method:"PUT", 
                    headers:auth(), 
                    body:JSON.stringify(data)
                })
        .then(res => res.json())
}

export function registerPostVoteApi(postId, voteType){
    const postURL = `${serviceURL}/posts/${postId}`
    return fetch( postURL, 
                {
                    method:"POST", 
                    headers:auth(), 
                    body:JSON.stringify({option: voteType})
                })
            .then(res => res.json())        
}

export function deletePostApi(postId){
    const deletePostURL = `${serviceURL}/posts/${postId}`
    return fetch( deletePostURL, 
        {
            method:"DELETE", 
            headers:auth(), 
        })
    .then(res => res.json())
}
