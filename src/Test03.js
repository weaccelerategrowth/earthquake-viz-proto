import React, { Component } from 'react';
import './styles/test03.scss';
import postscribe from 'postscribe';

class Test03 extends Component {
    componentDidMount() {
        postscribe('#scripts', `<script async type="text/javascript" src="test03-script.js"></script>`)
    }
    render() {
        return (
            <div className="something">
                <canvas class="mesh" width="100%" height="100%"></canvas>
                <div class="stuff">
                    <img className="logo" src="assets/Quake_Logo_WHITE_wStrapline.png" alt=""></img>
                    <h2>Animated mesh gradient demo</h2>
                </div>
                <div class="controls">
                    <input type="text" value="255,0,0" class="rgbchoice choice1"/><br></br>
                    <input type="text" value="0,255,255" class="rgbchoice choice2"/><br></br>
                    <input type="text" value="0,0,255" class="rgbchoice choice3"/><br></br>
                    <input type="text" value="255,255,0" class="rgbchoice choice4"/><br></br>
                    <button class="new-random">Random</button><button class="start-rando">Start Slideshow</button>
                </div>
                <div id="scripts">
                </div>
            </div>
        );
    }
}

export default Test03;