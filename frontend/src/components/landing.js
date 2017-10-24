import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Grid } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

import CategoryList from './category-list'
import PostList from './post-list'

class Landing extends Component{
    render(){
        return(
            <Grid>
                <Row>
                    <Col md={3}>
                        <h3> Post Categories </h3>
                        <CategoryList />
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col md={6} >
                                <h3> Posts </h3>
                            </Col>
                            <Col md={6} className="text-right">
                                <Link to="posts/new">
                                    <Button bstyle="success">Create Post</Button>
                                </Link>
                            </Col>
                        </Row>
                        <PostList  {...this.props} />
                    </Col>    
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps({ categories, posts }){
    return{
        categories,
        posts,
    }
}

export default connect(mapStateToProps)(Landing);