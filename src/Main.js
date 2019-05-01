import React, { Component } from 'react';
import {
    Route,
    NavLink,
    HashRouter
} from 'react-router-dom';
import Test01 from "./Test01";
import Test02 from "./Test02";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <div className="page-wrapper">
                        <div className="side-menu">
                            <div>
                                <div className="description">
                                    <h1 className="title">Earthquake Data Vizualisations</h1>
                                    <p className="sub-p">Experiments for the Quake website</p>
                                    <p className="author">by <a href="https://www.weaccelerategrowth.com">WeAccelerateGrowth</a></p>
                                </div>
                                <ul id="menu-links">
                                    <li>
                                        <NavLink to="/test-01">Test 01</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/test-02">Test 02</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/test-03">Test 03</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div class="links">
                                <a href="https://github.com/weaccelerategrowth/earthquake-viz-proto">
                                    <img src="./images/github-logo.svg" alt="View the code on GitHub"/>
                                </a>
                            </div>
                        </div>
                        <div class="content">
                            <Route path="/test-01" component={Test01}/>
                            <Route path="/test-02" component={Test02}/>
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default Main;