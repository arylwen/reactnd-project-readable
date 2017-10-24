import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

import PostItem from './post-item'

import { getPostsThunk } from '../thunks/posts-thunks'
import { getPostsForCategoryThunk } from '../thunks/categories-thunks'

import { setSortOrderAction } from "../actions/posts-actions"

import { unMap } from '../util'
import { dynamicSort } from '../util'

class PostList extends Component {

    componentWillMount(){
        if(this.props.match.params.category){
            //invoked upon refresh
            this.props.getPostsForCategoryThunk(this.props.match.params.category)
        } else {
            this.props.getPostsThunk()
        }
        this.props.setSortOrderAction('voteScore')
        //console.log("post list ", this.props)
    }

    renderPosts(){
        const { posts } = this.props
        console.log("render postlist props: ", this.props)

        
        if(posts && posts.length>0) {
            let orderedPosts = {}
            if(this.props.sortOrder){
                orderedPosts = posts.sort(dynamicSort(this.props.sortOrder)).reverse()
            } else {
                orderedPosts = posts    
            }
            return orderedPosts.map( 
                post => <PostItem key={post.id} post={post}/>
            )
        }
    }

    render(){
        return(
            <div>
                <div className="form-inline text-right">
                  <label htmlFor="sortOrderSelect">SortBy:</label>
                  <select onChange={event => this.props.setSortOrderAction(event.target.value)} className="form-control" id="sortOrderSelect">
                    <option value='voteScore'>Votes</option>
                    <option value='timestamp'>Date</option>
                  </select>
                </div>

                <ListGroup componentClass="ul">
                    {this.renderPosts()}
                </ListGroup>    
            </div>
        )
    }
}

function mapStateToProps(state){
    //console.log(state, unMap(state.posts.postMap))
    console.log("post-list mapStateToProps ",state)
    return{
            posts: unMap(state.posts.postMap),
            sortOrder: state.posts.sortOrder,
        }
}

export default connect(mapStateToProps, {
    getPostsThunk,
    getPostsForCategoryThunk,
    setSortOrderAction
}) (PostList)