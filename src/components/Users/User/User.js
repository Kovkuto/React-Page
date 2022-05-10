import React from "react";
import { NavLink } from "react-router-dom";
import classes from "../Users.module.css";


const User = (props) => {
  return (
    <div className={classes.all_items}>
      <div className={classes.img_button}>
        <NavLink to={`/profile/${props.id}`}>
          <img alt="img" src={props.photos.small === null
            ? "https://media.istockphoto.com/photos/very-closeup-view-of-amazing-domestic-pet-in-mirror-round-fashion-is-picture-id1281804798?k=20&m=1281804798&s=612x612&w=0&h=gN9-n0NVMyyQ0GYYoEqPSPCXVZwkCZbRummxgqhxOIU="
            : props.photos.small} />
        </NavLink>
        {props.followed
          ? <button disabled={props.followInProgress.some(id => id === props.id)}
            onClick={() => { props.unfollow(props.id) }}>Unfollow</button>
          : <button disabled={props.followInProgress.some(id => id === props.id)}
            onClick={() => { props.follow(props.id) }}>Follow</button>
        }
      </div>
      <div className={classes.all_description}>
        <h3>{props.name}</h3>
        <p>{props.status}</p>
      </div>
    </div>
  )
}


export default User
