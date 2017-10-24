import { GET_POSTS } from '../actions/posts-actions'
import { GET_POSTS_FOR_CATEGORY } from '../actions/categories-actions'
import { GET_POST_BY_ID } from '../actions/posts-actions'
import { GET_COMMENT_COUNT_FOR_POST } from '../actions/comments-actions'
import { CREATE_POST } from '../actions/posts-actions'
import { UPDATE_POST } from '../actions/posts-actions'
import { REGISTER_POST_VOTE } from '../actions/posts-actions'
import { SET_SORT_ORDER } from '../actions/posts-actions'
import { DELETE_POST } from '../actions/posts-actions'

import { mapById } from '../util'

const initialState = {postMap:{}, commentCount:{}, sortOrder:'voteScore'}

/**
* The awful truth: because of the async nature of REST calls, one cannot
* assume the order in which these are called; getCommentCountForPost could be
* called before getPostById, even if their thunks are called viceversa
*
* lesson learned: the state managed in response to each action must be 
* separated for each async call or its granularity observed
*/    

export function postsReducer(state=initialState, action){
    switch(action.type){
        case GET_POSTS:
            return{
                ...state,
                postMap:mapById(action.posts),
                postCreated:false,
                postUpdated:false,
                postDeleted:false,
            }

        case GET_POSTS_FOR_CATEGORY:
            return{
                ...state,
                postMap:mapById(action.posts),
                postCreated:false,
                postUpdated:false,
                postDeleted:false,
            }

        case GET_COMMENT_COUNT_FOR_POST:
            return {
                ...state,
                commentCount:{
                    ...state.commentCount,
                    [action.postId]:action.commentCount  
                }
            }
          
        case GET_POST_BY_ID:
            return {
                ...state,
                postMap:{
                    ...state.postMap,
                    [action.post.id]:action.post,  
                },
                postCreated:false,
                postUpdated:false,
                postDeleted:false,
        }
        
        case REGISTER_POST_VOTE:
            return {
                ...state,
                postMap:{
                    ...state.postMap,
                    [action.post.id]:action.post  
                }
            }

        case CREATE_POST:
            return {
                ...state,
                postCreated:true,
            }
            
        case UPDATE_POST:
            return {
                ...state,
                postUpdated:true,
            }       
            
        case SET_SORT_ORDER:    
        return {
            ...state,
            sortOrder:action.sortOrder,
        }       

        case DELETE_POST:
            delete state.postMap[action.post.id]
            return{
                ...state, 
                postDeleted:true,
            }
                
        default:
            return state
    }   
}

