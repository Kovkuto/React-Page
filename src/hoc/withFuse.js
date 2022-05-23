import React from "react"

const withFuse = (Component) => {
    class WithFuse extends React.Component{
        state = {
            err: null,
            errInfo: null
        }
        componentDidCatch(err, errInfo){
            this.setState({
                err: true,
                errInfo: errInfo
            })
            console.log(err);
        }
        render(){
            if (this.state.err) return (<>
            <h1>Something went wrong...</h1>
            <h2>{this.state.err}</h2>
            <p>{this.state.errInfo}</p>
            </>)
            return <Component {...this.props}/>
        }
    }
    return WithFuse
}

export default withFuse
