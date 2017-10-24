export const GET_COMMENT_COUNT_FOR_POST = "GET_COMMENT_COUNT_FOR_POST"
export const GET_COMMENTS_FOR_POST = "GET_COMMENTS_FOR_POST"
export const GET_COMMENT_BY_ID = "GET_COMMENT_BY_ID"
export const CREATE_COMMENT = "CREATE_COMMENT"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const REGISTER_COMMENT_VOTE = "REGISTER_COMMENT_VOTE"
export const DELETE_COMMENT = "DELETE_COMMENT"

export function getCommentCountForPostAction(postId, commentCount){
    return {
        type: GET_COMMENT_COUNT_FOR_POST,
        postId,
        commentCount,
    }
}

export function getCommentsForPostAction(postId, comments){
    return {
        type: GET_COMMENTS_FOR_POST,
        postId,
        comments,
    }
}

export function getCommentByIdAction(comment){
    return {
        type: GET_COMMENT_BY_ID,
        comment
    }
}

export function createCommentAction(comment){
    return {
        type: CREATE_COMMENT,
        comment
    }
}

export function updateCommentAction(comment){
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export function registerCommentVoteAction(comment){
    return{
        type: REGISTER_COMMENT_VOTE,
        comment,
    }
}

export function deleteCommentAction(comment)
{
    return{
        type: DELETE_COMMENT,
        comment,
    }
}