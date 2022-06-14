import React from "react";
import { NavLink } from "react-router-dom";
import { IPhotos } from "../../../redux/profileReducer";
import classes from "../Users.module.css";

interface IUserProps {
  id: number,
  photos: IPhotos,
  followed: boolean,
  followInProgress: number[],
  followUnfollowFlow: Function,
  name: string,
  status: string 
}

const User = ({id, photos, followed, followInProgress, followUnfollowFlow, name, status}: IUserProps) => {
  return (
    <div className={classes.all_items}>
      <div className={classes.img_button}>
        <NavLink to={`/profile/${id}`}>
          <img alt="img" src={photos.small === null
            ? "https://media.istockphoto.com/photos/very-closeup-view-of-amazing-domestic-pet-in-mirror-round-fashion-is-picture-id1281804798?k=20&m=1281804798&s=612x612&w=0&h=gN9-n0NVMyyQ0GYYoEqPSPCXVZwkCZbRummxgqhxOIU="
            : photos.small} />
        </NavLink>
        {followed
          ? <button disabled={ followInProgress.some(id => id === id)}
            onClick={() => { followUnfollowFlow(id, false) }}>Unfollow</button>
          : <button disabled={followInProgress.some(id => id === id)}
            onClick={() => { followUnfollowFlow(id, true) }}>Follow</button>
        }
      </div>
      <div className={classes.all_description}>
        <h3>{name}</h3>
        <p>{status}</p>
      </div>
    </div>
  )
}

export default User
