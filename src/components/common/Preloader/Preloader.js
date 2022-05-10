import classes from "./Preloader.module.css"
import React from "react"

const Preloader = (props) => {
    return <img
        src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
        className={classes.preloader}
    />
}


export default Preloader
