import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { ListGroupItem } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Label } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { ButtonGroup } from 'react-bootstrap'

import { getCommentCountForPostThunk } from '../thunks/comments-thunks'
import { registerPostVoteThunk } from '../thunks/posts-thunks'
import { deletePostThunk } from '../thunks/posts-thunks'
import { timestampToString } from '../util'

class PostItem extends Component{

    componentWillMount(){
        //console.log("componentWillMount ", this.props)
        this.props.getCommentCountForPostThunk(this.props.post.id)
    }

    handleDeletePost(id) {
        this.props.deletePostThunk(id)
    }

    render(){
        const {post, commentCount} = this.props
        return(
            <ListGroupItem key={post.id}>
                <ButtonGroup className="pull-right">
                    <Button onClick={ ()=> this.handleDeletePost(post.id) } bsStyle="danger">
                        <Glyphicon glyph="remove" />
                    </Button>
                    <Link to={`${post.category}/edit/${post.id}`}>
                        <Button bsStyle = "warning"> 
                            <Glyphicon glyph="edit" />
                        </Button>
                    </Link>   
                </ButtonGroup>      
                <Link to={`${post.category}/${post.id}`}>
                    <b>{post.title}</b>
                </Link>
                <br/>
                <small>By {post.author} on {timestampToString(post.timestamp)} </small>                  
                <p>{post.body}</p>
                <Row>
                    <Col md={12}>
                        <Col md={9} className="text-left">
                            <h4><Label bsStyle="primary">{post.category}</Label></h4>
                            {commentCount?commentCount:0} comments
                        </Col>
                        <Col md={3} className="text-right">
                            <h3><Label bsStyle={post.voteScore < 0 ? "danger":"success"}>{post.voteScore}</Label></h3>
                            <Button onClick={ () => this.props.registerPostVoteThunk(post.id, "upVote") }>
                                <Glyphicon glyph="thumbs-up" />
                            </Button>
                            <Button onClick={ () => this.props.registerPostVoteThunk(post.id, "downVote") }>
                                <Glyphicon glyph="thumbs-down" />
                            </Button>
                        </Col>
                    </Col>
                </Row>    
            </ListGroupItem> 
        )
    }
}

function mapStateToProps(state, ownState){
    //console.log(state, ownState)
    if(state.posts.commentCount)
        return {commentCount:state.posts.commentCount[ownState.post.id]}
    else
        return {commentCount:0}    
}

export default connect(mapStateToProps, {
    getCommentCountForPostThunk,
    registerPostVoteThunk,
    deletePostThunk
})(PostItem)
