import React, { memo } from "react";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { requiredField } from "../../../utils/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";
import Post from './Post/Post'

const MyPost = (props) => {
    const addPost = (text) => {
        props.addPost(text)
    }
    
    const onSubmit = (formData) => {
        addPost(formData.postText)
        console.log(formData);
    }
    console.log("RENDER")
    let myPostsElements = props.myPostsData.map(post => {
        return <Post key={post.id} id={post.id} text={post.text} likes={post.likes} />
    })
    return (
        <div className="my_posts">
            <h3>My Posts:</h3>
            <PostReduxForm onSubmit={onSubmit} addPost={props.addPost}/>
            {myPostsElements}
        </div>
    )
}

export const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="postText" component={Textarea} placeholder="Post Text" validate={[requiredField]}/>
            <button type="submit">Create</button>
        </form>
    )
}

const PostReduxForm = reduxForm({
    form: "post"
})(PostForm)

export default MyPost
