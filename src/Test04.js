import React, { Component } from 'react';
import postscribe from 'postscribe';
// import p5 from 'p5';

class Test04 extends Component {
        componentDidMount() {
            postscribe('#map-canvas', `<script language="javascript" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js"></script>
            <script language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js"></script>
            <script>
            var mapimg;

            var clat = 0;
            var clon = 0;

            var ww = 1200;
            var hh = 600;

            var zoom = 1;
            var earthquakes;

            function preload() {
            // The clon and clat in this url are edited to be in the correct order.
            mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
                clon + ',' + clat + ',' + zoom + '/' +
                ww + 'x' + hh +
                '?access_token=pk.eyJ1Ijoiam9zZXBoaXphdHQiLCJhIjoiY2p2M3N3emE3MDBwNDRkcnl2OTRnYmF2NCJ9.HJac6SzYxeSk_cTv-OOjGA');
            // earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
            earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
            }

            function mercX(lon) {
            lon = radians(lon);
            var a = (256 / PI) * pow(2, zoom);
            var b = lon + PI;
            return a * b;
            }

            function mercY(lat) {
            lat = radians(lat);
            var a = (256 / PI) * pow(2, zoom);
            var b = tan(PI / 4 + lat / 2);
            var c = PI - log(b);
            return a * c;
            }


            function setup() {
                createCanvas(ww, hh);
                translate(width / 2, height / 2);
                imageMode(CENTER);
                image(mapimg, 0, 0);

                var cx = mercX(clon);
                var cy = mercY(clat);

                for (var i = 1; i < earthquakes.length; i++) {
                    var data = earthquakes[i].split(/,/);
                    //console.log(data);
                    var lat = data[1];
                    var lon = data[2];
                    var mag = data[4];
                    var x = mercX(lon) - cx;
                    var y = mercY(lat) - cy;
                    // This addition fixes the case where the longitude is non-zero and
                    // points can go off the screen.
                    if(x < - width/2) {
                    x += width;
                    } else if(x > width / 2) {
                    x -= width;
                    }
                    mag = pow(25, mag);
                    mag = sqrt(mag);
                    var magmax = sqrt(pow(10, 10));
                    var d = map(mag, 0, magmax, 0, 180);
                    stroke(161, 18, 82);
                    fill(255, 29, 50, 200);
                    ellipse(x, y, d, d);
                }

            }
        </script>`)
        }
        componentWillUnmount() {
            window.location.reload();
        }
        render() {
            return (
                    <div style={{
                        'height': '100%',
                        'width': '100%',
                    }}
                    id="map-canvas"/>

            );
        }
    }
    

export default Test04;