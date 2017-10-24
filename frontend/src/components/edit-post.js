import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

import { reduxForm } from 'redux-form'
import { Field } from 'redux-form'

import { FormGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'

import { getPostByIdThunk } from '../thunks/posts-thunks'
import { updatePostThunk } from '../thunks/posts-thunks'

class EditPost extends Component {
    componentWillMount(){
        console.log(this.props)
        this.props.getPostByIdThunk(this.props.match.params.postid)
    }

    componentDidMount(){
        console.log("componentDidMount")
        this.initializeForm(this.props.post)
    }

    initializeForm(post){
        if (post) {
            const initialData = {
              "title": post.title,
              "body": post.body
            };
            console.log(initialData)
            this.props.initialize(initialData);
          }  
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

    onUpdatePost(values){
        values.category = this.props.post.category
        values.id = this.props.post.id
        values.author = this.props.post.author
        console.log("onUpdatePost", values)
        this.props.updatePostThunk(values)
    }

    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps",nextProps)
        if(nextProps.post !== this.props.post)
            this.initializeForm(nextProps.post) 

        if(nextProps.postUpdated)
            this.props.history.goBack()
    }

    render(){
        console.log("edit-post-render")
        const { handleSubmit, post } = this.props
      
        return(
            <form onSubmit={handleSubmit(this.onUpdatePost.bind(this))}>
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
                <FormGroup>
                    <ControlLabel>Author</ControlLabel>
                    <FormControl.Static>{post ? post.author : ''}</FormControl.Static>
                </FormGroup>
                <Button type="submit" bsStyle="primary">Submit</Button>
                <Button onClick={()=>{this.props.history.goBack()}} bsStyle="danger">Cancel</Button>
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

function mapStateToProps({ categories, posts }, ownprops){
    return{
        categories,
        postUpdated: posts.postUpdated,
        post: posts.postMap[ownprops.match.params.postid]
    }
}

export default reduxForm({
    validate:validateForm,
    form:"EditPostForm"
})(connect(mapStateToProps, {
    getPostByIdThunk,
    updatePostThunk,
})(EditPost))