import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import{ Link } from 'react-router-dom'

import { reduxForm } from 'redux-form'
import { Field } from 'redux-form'

import { FormGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

import { createCommentThunk } from '../thunks/comments-thunks'

class NewComment extends Component {

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

    onCreateComment(values){
        values.parentId = this.props.match.params.postid
        this.props.createCommentThunk(values)
    }

    render(){
        console.log(this.props)
        const { handleSubmit } = this.props
        const postId = this.props.match.params.postid        

        if(this.props.commentCreated){
            this.props.history.push(`/posts/${postId}`)
        }

        return(
            <form onSubmit={handleSubmit(this.onCreateComment.bind(this))}>
                <Field
                    label="Comment"
                    name="body"
                    component={this.renderFormField}
                />
                <Field
                    label="Author"
                    name="author"
                    component={this.renderFormField}
                />
                <Button type="submit" bsStyle="primary">Submit</Button>
                <Link to={`/posts/${postId}`} className="btn btn-danger">Cancel</Link>
          </form>
      )
    }
}

function validateForm(fieldValues){
    const formErrors = {};
    
    if (!fieldValues.author) {
        formErrors.author = "Please enter a name!"
    }
    
    if (!fieldValues.body) {
        formErrors.body = "Comment content cannot be empty!"
    }
    
    return formErrors;

}

function mapStateToProps({ comments }){
    //console.log(comments)
    return{
        commentCreated: comments.commentCreated,
    }
}

export default reduxForm({
    validate:validateForm,
    form:"NewCommentForm"
})(connect(mapStateToProps, {
    createCommentThunk,
})(NewComment))