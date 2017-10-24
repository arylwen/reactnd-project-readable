import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import{ Link } from 'react-router-dom'

import { reduxForm } from 'redux-form'
import { Field } from 'redux-form'

import { FormGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'

import { getCommentByIdThunk } from '../thunks/comments-thunks'
import { updateCommentThunk } from '../thunks/comments-thunks'

class EditComment extends Component {

    componentWillMount(){
        this.props.getCommentByIdThunk(this.props.match.params.commentid)
    }

    componentWillReceiveProps(nextProps){
        //console.log("componentWillReceiveProps",nextProps)
        if(nextProps.comment !== this.props.comment)
            this.initializeForm(nextProps.comment) 

        if(nextProps.commentUpdated)
            this.props.history.goBack()
    }

    initializeForm(comment){
        if (comment) {
            const initialData = {
              "body": comment.body
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

    onUpdateComment(values){
        values.parentId = this.props.comment.parentId
        values.id = this.props.comment.id
        values.author = this.props.comment.author
        
        this.props.updateCommentThunk(values)
    }

    render(){
        console.log(this.props)
        const { handleSubmit, comment } = this.props
        const postId = this.props.match.params.postid        

        return(
            <form onSubmit={handleSubmit(this.onUpdateComment.bind(this))}>
                <Field
                    label="Comment"
                    name="body"
                    component={this.renderFormField}
                />
                <ControlLabel>Author</ControlLabel>
                <FormControl.Static>{comment ? comment.author : ''}</FormControl.Static>
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
        formErrors.body = "Post content cannot be empty!"
    }
    
    return formErrors;

}

function mapStateToProps({ comments }){
    //console.log(comments)
    return{
        comment: comments.commentMap[0],
        commentUpdated: comments.commentUpdated,
    }
}

export default reduxForm({
    validate:validateForm,
    form:"EditCommentForm"
})(connect(mapStateToProps, {
    getCommentByIdThunk,
    updateCommentThunk,
})(EditComment))