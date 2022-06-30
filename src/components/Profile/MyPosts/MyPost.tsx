import React, { memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Field } from "redux-form";
import { addPost } from "../../../redux/profileReducer";
import { StateType } from "../../../redux/redux-store";
import { requiredField } from "../../../utils/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";
import Post from './Post/Post'

type Props = ConnectedProps<typeof connector>

const MyPost = React.memo((props: Props) => {
    const addPost = (text: string) => {
        props.addPost(text)
    }
    
    const onSubmit = (formData: IForm) => {
        addPost(formData.postText)
    }
    
    let myPostsElements = props.myPostsData.map(post => {
        return <Post key={post.id} text={post.text} likes={post.likes} />
    })
    return (
        <div className="my_posts">
            <h3>My Posts:</h3>
            <PostReduxForm onSubmit={onSubmit}/>
            {myPostsElements}
        </div>
    )
})

interface IForm {
    postText: string
}

export const PostForm: React.FC<InjectedFormProps<IForm>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="postText" component={Textarea} placeholder="Post Text" validate={[requiredField]}/>
            <button type="submit">Create</button>
        </form>
    )
}

const PostReduxForm = reduxForm<IForm>({
    form: "post"
})(PostForm)

let mapStateToProps = (state: StateType) => ({
    myPostsData: state.profilePage.myPostsData,
})

let connector = connect(mapStateToProps, {
    addPost
})

export default connector(MyPost)
