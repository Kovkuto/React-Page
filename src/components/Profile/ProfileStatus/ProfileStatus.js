import React, { useRef } from "react";


class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.state.status = this.props.status
        this.setState({
            ...this.state,
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            ...this.state,
            editMode: false
        })
        if (this.state.status !== this.props.status) {
            this.props.updateStatus(this.state.status)
        }
    }

    onStatusChage = (e) => {
        this.setState({
            ...this.state,
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps, prevState)
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <div>
                        <input onBlur={this.deactivateEditMode} onChange={this.onStatusChage} autoFocus value={this.state.status} />
                    </div>
                    : <div>
                        <span onDoubleClick={this.activateEditMode}>{!this.props.status ? "No status" : this.props.status}</span>
                    </div>
                }
            </div>
        )
    }
}


export default ProfileStatus
