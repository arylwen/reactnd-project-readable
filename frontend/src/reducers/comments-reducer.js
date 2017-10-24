import { GET_COMMENTS_FOR_POST } from '../actions/comments-actions'
import { GET_COMMENT_BY_ID } from '../actions/comments-actions'
import { CREATE_COMMENT } from '../actions/comments-actions'
import { UPDATE_COMMENT } from '../actions/comments-actions'
import { DELETE_COMMENT } from '../actions/comments-actions'
import { REGISTER_COMMENT_VOTE } from '../actions/comments-actions'

/**
 * map of comments indexed by postId
 */
const initialState = {commentMap:{}}

export function commentsReducer(state=initialState, action){
    //console.log("comments reducer ", state)
    switch(action.type){
        case GET_COMMENTS_FOR_POST:
            return{
                ...state,
                commentMap:{
                    //...state.commentMap, keep ony current comments?
                    [action.postId]:action.comments
                },
                commentCreated:false,
                commentUpdated:false,
                commentDeleted:false,
            }

        case GET_COMMENT_BY_ID:
            return {
                ...state,
                commentMap:[action.comment],
                commentCreated:false,
                commentUpdated:false,
                commentDeleted:false,
            }
        
        case REGISTER_COMMENT_VOTE:  
            let comments = state.commentMap[action.comment.parentId]
            let newcomments = comments.map(
                function(comm){
                    if(comm.id===this.id) 
                        return this; 
                    else 
                        return comm
                }, action.comment)
            return {
                ...state,
                commentMap:{
                    ...state.commentMap,
                    [action.comment.parentId]:newcomments  
                }

            }
    
        case CREATE_COMMENT:
            return {
                ...state,
                commentCreated:true
            }
            
        case UPDATE_COMMENT:
            return {
                ...state,
                commentUpdated:true
            }            
                    
        case DELETE_COMMENT:
            //all post comments should be re-queried
            //delete state.commentMap[action.comment.id]
            return{
                ...state, 
                commentDeleted:true,
        }
        
        default:
            return state
    }
}
