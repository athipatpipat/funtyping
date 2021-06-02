import { useState } from 'react';
import React, { Component } from "react";

export default class Animations extends Component {
    componentDidMount() {
        const script = document.createElement("script");
    
        // script.src = "../src/animationa/animations.js";
        script.src = "animations.js";
        script.async = true;
    
        // document.body.appendChild(script);
        document.querySelector("#main").appendChild(script);

        const app_script = document.createElement("script");
        // app_script.src = "../src/animationa/app.js";
        app_script.src = "app.js";
        app_script.async = true;
        document.querySelector("#main").appendChild(app_script);
      }

    render() {
        return (
            <div id="main">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.2.0/p5.min.js"></script>
                {/* <script src="../src/animation/animations.js"></script> */}
                {/* <script src="../src/animation/app.js"></script> */}
                <div id="scriptTarget" />
            </div>
            )
    }
}
