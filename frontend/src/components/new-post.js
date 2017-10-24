import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import{ Link } from 'react-router-dom'

import { reduxForm } from 'redux-form'
import { Field } from 'redux-form'

import { FormGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

import { getCategoriesThunk } from '../thunks/categories-thunks'
import { createPostThunk } from '../thunks/posts-thunks'

class NewPost extends Component {
    componentWillMount(){
        this.props.getCategoriesThunk()
    }

    renderFormField(dataField){
        const { meta: {touched, error}} = dataField
        const className = touched && error ? 'error' : null

        return (
            <FormGroup validationState={className}>
                <label>{dataField.label} </label>
                <FormControl 
                    type="text"
                    {...dataField.input}
                />
                <div className="text-help">
                    {touched ? error:''}
                </div>
            </FormGroup>
        )
    }

    renderCategorySelector(dataField){
        console.log("renderCategorySelector ", this.props)
        const {categories} = this.props
        const {meta: {touched, error}} = dataField
        const className = touched && error ? 'error':null
        return(
            <FormGroup validationState={className}>
                <label>{dataField.label}</label>
                <select {...dataField.input} className="form-control">
                    <option value="" className="disabled">-- Select category--</option>
                    {categories?categories.map(category => (
                        <option
                            key={category.name}
                            value={category.name}
                        >
                            {category.name}
                        </option>    
                    )):[]}
                </select>
                <div className="text-help">
                    {dataField.meta.touched ? dataField.meta.error : ''}
                </div>
            </FormGroup>
        )
    }

    onCreatePost(values){
        this.props.createPostThunk(values)
    }

    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps",nextProps)
        if(nextProps.postCreated)
            this.props.history.goBack()
    }

    render(){
        const { handleSubmit } = this.props

        return(
            <form onSubmit={handleSubmit(this.onCreatePost.bind(this))}>
                <Field
                    label="Category:"
                    name="category"
                    component={field => this.renderCategorySelector(field)}
                />
                <Field
                    label="Title:"
                    name="title"
                    component={this.renderFormField}
                />
                <Field
                    label="Content:"
                    name="body"
                    component={this.renderFormField}
                />
                <Field
                    label="Author:"
                    name="author"
                    component={this.renderFormField}
                />
                <Button type="submit" bsStyle="primary">Submit</Button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validateForm(fieldValues){
    const formErrors = {};
    
    if (!fieldValues.title) {
        formErrors.title = "Please enter a title!"
    }
    
    if (!fieldValues.author) {
        formErrors.author = "Please enter a name!"
    }
    
    if (!fieldValues.body) {
        formErrors.body = "Post content cannot be empty!"
    }
    
    if (!fieldValues.category) {
        formErrors.category = "Please select a category!"
    }
    
    return formErrors;

}

function mapStateToProps({ categories, posts }){
    return{
        categories,
        postCreated: posts.postCreated,
    }
}

export default reduxForm({
    validate:validateForm,
    form:"NewPostForm"
})(connect(mapStateToProps, {
    getCategoriesThunk,
    createPostThunk,
})(NewPost))