import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { ListGroupItem } from 'react-bootstrap'

import { getCategoriesThunk } from '../thunks/categories-thunks'
import { getPostsForCategoryThunk} from '../thunks/categories-thunks'

class CategoryList extends Component {

    componentWillMount(){
        //console.log('before getCategoriesThunk')
        this.props.getCategoriesThunk()
    }

    renderCategories(){
        const {categories} = this.props
        if(categories){
            return categories.map(category => {
                return (
                    <ListGroupItem key={category.path}> 
                        <Link to={`/${category.path}`}
                              onClick={ () => this.props.getPostsForCategoryThunk(category.path)}>
                            {category.name}
                        </Link>        
                    </ListGroupItem>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <ListGroupItem> 
                    <Link to="/">All Posts</Link>
                </ListGroupItem>
                <div>
                    {this.renderCategories()}
                </div>    
            </div>
        )
    }
}

function mapStateToProps( state ) {
    return{
        categories: state.categories,
    }
}

export default connect( mapStateToProps, 
    { getCategoriesThunk, getPostsForCategoryThunk }
)(CategoryList)
