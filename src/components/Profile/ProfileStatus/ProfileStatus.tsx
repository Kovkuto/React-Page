import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";


type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = ({status, updateStatus}) => {

    let [editMode, setEditMode] = useState(false)
    let [statusText, setStatusText] = useState(status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        if (statusText !== status) {
            updateStatus(status)
        }
    }
    useEffect(() => {
        setStatusText(status)
    }, [status])
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => setStatusText(e.currentTarget.value)

    return (
        <div>
            {editMode
                ? <div>
                    <input onChange={onStatusChange} autoFocus onBlur={deactivateEditMode} value={status}/>
                </div>
                : <div>
                    <span onDoubleClick={activateEditMode}>{!status ? "No status" : status}</span>
                </div>
            }
        </div>
    )
}


export default ProfileStatus
