import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Label } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { ButtonToolbar } from 'react-bootstrap'

import { PageNotFound } from './404'
import CommentList from './comment-list'

import { getPostByIdThunk } from '../thunks/posts-thunks'
import { getCommentCountForPostThunk } from '../thunks/comments-thunks'
import { registerPostVoteThunk } from '../thunks/posts-thunks'
import { deletePostThunk } from '../thunks/posts-thunks'

import { timestampToString } from '../util'

class DisplayPost extends Component{

    componentWillMount(){
        const {postid} = this.props.match.params
        console.log(postid)
        this.props.getPostByIdThunk(postid)
        this.props.getCommentCountForPostThunk(postid)
    }
    
    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps",nextProps)

        if(nextProps.postDeleted)
            this.props.history.push('/')

        if(nextProps.commentDeleted)
            this.props.getCommentCountForPostThunk(this.props.match.params.postid)      
    }

    handleDeletePost(id) {
        this.props.deletePostThunk(id)
    }

    render(){
        const {post ,commentCount} = this.props
        console.log("display-post ", this.props)
        return(
            !post
            ? < PageNotFound />
            :
            <div>
                <ButtonToolbar>
                    <Button onClick={()=>{this.props.history.push('/')}} bsStyle="link">Back</Button>
                    <Link to={`/posts/edit/${post.id}`}>
                        <Button bsStyle="warning">Edit Post</Button>
                    </Link>    
                    <Button bsStyle="danger"
                        onClick={() => {this.handleDeletePost(post.id)}}>
                        Delete Post
                    </Button>
                </ButtonToolbar>
                <Row>
                    <Col md={12}>
                        <Col md={8} className="text-left">
                            <h2>{post.title}<br/><small>Posted by {post.author} on {timestampToString(post.timestamp)} </small></h2>
                            <h4><Label bsStyle="primary">{post.category}</Label></h4>
                            <p>{post.body}</p>
                            {commentCount ? commentCount : 0 } comments
                        </Col>
                        <Col md={4} className="text-right">
                                <h3><Label bsStyle={post.voteScore < 0 ? "danger": "success"}>{post.voteScore}</Label></h3>
                                <Button onClick={() => this.props.registerPostVoteThunk(post.id, "upVote")}>
                                    <Glyphicon glyph="thumbs-up" />
                                </Button>
                                <Button onClick={() => this.props.registerPostVoteThunk(post.id, "downVote")}>
                                    <Glyphicon glyph="thumbs-down" />
                                </Button>
                            </Col>
                    </Col>                    
                </Row>    
                <Row>
                    <Col md={12} className="text-right">
                        <Link to={`/${post.category}/${post.id}/comments/new`}>
                            <Button bsStyle="primary">Add comment</Button>
                        </Link>
                    </Col>
                </Row>    
                <CommentList postCategory={post.category} postId={post.id} />                       
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    console.log("mapStateToProps ", state, ownProps)
    const postId = ownProps.match.params.postid
    //console.log(postId, state.posts.postMap[postId])
    return{
        post: state.posts.postMap[postId],
        postDeleted: state.posts.postDeleted,
        commentDeleted: state.comments.commentDeleted,
        commentCount:ownProps
                    ?state.posts.commentCount?state.posts.commentCount[postId]:0
                    :0
    }
}

export default connect(mapStateToProps,{
    getPostByIdThunk,
    getCommentCountForPostThunk,
    registerPostVoteThunk,
    deletePostThunk,
})(DisplayPost)