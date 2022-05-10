import MyPost from "./MyPost";
import { addPost } from "../../../redux/profileReducer";
import { connect } from "react-redux";


let mapStateToProps = (state) => ({
    myPostsData: state.profilePage.myPostsData,
    newPostText: state.profilePage.newPostText
})

let MyPostsContainer = connect(mapStateToProps, {
    addPost
})(MyPost)

export default MyPostsContainer