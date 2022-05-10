import React from "react";
import classes from './Post.module.css'

function Post(props){
    return(
        <div className={classes.item}>
            <img src='https://i.pinimg.com/originals/80/d3/64/80d364e09d31fcba8af274926d4332ff.jpg'/>
            <p>{props.text}</p>
            Likes: {props.likes}
        </div>
    )
}

export default Post
