import React from "react"

const withFuse = (Component) => {
    class WithFuse extends React.Component{
        state = {
            hasError: false
        }
        componentDidCatch(err, errInfo){
            this.setState({
                hasError: true
            })
            console.log(err);
        }
        render(){
            if (this.state.hasError) return <h1>Something went wrong...</h1>
            return <Component {...this.props}/>
        }
    }
    return WithFuse
}

export default withFuse
