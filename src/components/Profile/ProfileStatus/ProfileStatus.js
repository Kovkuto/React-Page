import React, { useEffect, useState } from "react";


const ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        if (status !== props.status) {
            props.updateStatus(status)
        }
    }
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const onStatusChange = (e) => setStatus(e.currentTarget.value)

    return (
        <div>
            {editMode
                ? <div>
                    <input onChange={onStatusChange} autoFocus onBlur={deactivateEditMode} value={status}/>
                </div>
                : <div>
                    <span onDoubleClick={activateEditMode}>{!props.status ? "No status" : props.status}</span>
                </div>
            }
        </div>
    )
}


export default ProfileStatus
