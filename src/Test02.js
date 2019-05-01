import React, { Component } from 'react';
import './styles/test02.scss';

class Test02 extends Component {
    componentWillUnmount() {
        window.location.reload();
    }
    render() {
        return (
            <div class="test2-container" id="gradient">
                <img className="logo" src="assets/Quake_Logo_COLOUR_wStapline.png" alt=""></img>
                <h2>Animated linear gradient demo</h2>
            </div>
        );
    }
}

export default Test02;