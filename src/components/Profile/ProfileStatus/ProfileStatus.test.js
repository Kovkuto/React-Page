import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import React from "react";

class ProfileStatusC extends React.Component {
    render() {
        return <ProfileStatus {...this.props}/>
    }
}

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatusC status="Kovkuto"/>)
        let instance = component.getInstance()
        expect(instance.props.status).toBe("Kovkuto")
    })
})

