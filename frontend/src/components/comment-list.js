import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { ButtonToolbar } from 'react-bootstrap'

import { getCommentsForPostThunk } from '../thunks/comments-thunks'
import { registerCommentVoteThunk } from '../thunks/comments-thunks'
import { deleteCommentThunk } from '../thunks/comments-thunks'

import { timestampToString } from '../util'

class CommentList extends Component{

    componentWillMount(){
        this.props.getCommentsForPostThunk(this.props.postId)
    }

    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps",nextProps)

        //reload comments; an opportunity to display new comments by other users
        if(nextProps.commentDeleted)
            this.props.getCommentsForPostThunk(this.props.postId)
    }


    handleDeleteComment(id){
        this.props.deleteCommentThunk(id)
    }

    renderComments(){
        const {comments, postCategory} = this.props
        console.log("renderComments ",comments)
        if(comments){
            return comments.map( comment => {
                //console.log(comment.id)
                return(
                    <ListGroupItem
                        header={comment.title}
                        key={comment.id}
                    >
                        <small>By {comment.author} on {timestampToString(comment.timestamp)} </small>
                        <div>{comment.body}</div>
                        <div>{comment.category} {comment.voteScore}</div>
                        <ButtonToolbar>
                        <Button onClick={() => this.props.registerCommentVoteThunk(comment.id, "upVote") }> 
                            <Glyphicon glyph="thumbs-up" />
                        </Button>
                        <Button onClick={() => this.props.registerCommentVoteThunk(comment.id, "downVote") }> 
                            <Glyphicon glyph="thumbs-down" />
                        </Button>
                        <Link to={`/${postCategory}/${comment.parentId}/comments/edit/${comment.id}`}>
                            <Button bsStyle="warning">
                                <Glyphicon glyph="edit" />
                            </Button>
                        </Link>
                        <Button onClick={ ()=> this.handleDeleteComment(comment.id) } bsStyle="danger">
                            <Glyphicon glyph="remove" />
                        </Button>
                        </ButtonToolbar>
                    
                    </ListGroupItem>
                )    
            })
        }
    }

    render(){
        return(
            <ListGroup>
                {this.renderComments()}
            </ListGroup>    
        )
    }
}

function mapStateToProps(state, ownProps){
    console.log("mapStateToProps ",state, ownProps)
    return{
        commentDeleted: state.comments.commentDeleted,
        comments:state.comments.commentMap[ownProps.postId],
    }
}

export default connect(mapStateToProps,{
    getCommentsForPostThunk,
    registerCommentVoteThunk,
    deleteCommentThunk
})(CommentList)