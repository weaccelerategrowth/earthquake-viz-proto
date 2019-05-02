import React, { Component } from 'react';
import {
    Route,
    NavLink,
    HashRouter
} from 'react-router-dom';
import Test01 from "./Test01";
import Test02 from "./Test02";
import Test03 from "./Test03";
import Test04 from "./Test04";
import Test05 from "./Test05";
import Test06 from "./Test05";

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
                                <NavLink to="/test-01"><li>1. Google Map Hotspots</li></NavLink>
                                <NavLink to="/test-02"><li>2. Linear Gradient Background</li></NavLink>
                                <NavLink to="/test-03"><li>3. Gradient Mesh Background</li></NavLink>
                                <NavLink to="/test-04"><li>4. Mapbox Hotspots</li></NavLink>
                                <NavLink to="/test-05"><li className="inactive">5. 24hr Live Data</li></NavLink>
                                <NavLink to="/test-06"><li>6. 24hr Live Data - No Map</li></NavLink>
                                </ul>
                            </div>
                            <div className="links">
                                <a href="https://github.com/weaccelerategrowth/earthquake-viz-proto">
                                    <img src="/images/github-logo.svg" alt="View the code on GitHub"/>
                                </a>
                            </div>
                        </div>
                        <div className="content">
                            <Route path="/test-01" component={Test01}/>
                            <Route path="/test-02" component={Test02}/>
                            <Route path="/test-03" component={Test03}/>
                            <Route path="/test-04" component={Test04}/>
                            <Route path="/test-05" component={Test05}/>
                            <Route path="/test-06" component={Test06}/>
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default Main;