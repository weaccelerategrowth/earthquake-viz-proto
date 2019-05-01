import React, { Component } from 'react';
import postscribe from 'postscribe';

class Test01 extends Component {
        componentDidMount() {
            postscribe('#map-canvas', `<script async type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBAP2QSAYcQU-LfJ41fFKuh4MFcmKW66DY"></script>
            <script> var map;
            var mapStyle = [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                'featureType': 'all',
                'elementType': 'all',
                'stylers': [{'visibility': 'off'}]
            }, {
                'featureType': 'landscape',
                'elementType': 'geometry',
                'stylers': [{'visibility': 'on'}, {'hue': '#fff'}, {'saturation': -100}, {'lightness': 30}]
            }, 
            {
                'featureType': 'water',
                'elementType': 'labels',
                'stylers': [{'visibility': 'off'}]
            },
            {
                'featureType': 'water',
                'elementType': 'geometry',
                'stylers': [{'visibility': 'on'}, {'hue': '#fff'}, {'lightness': 100}, {'saturation': -80}]
            }];

            google.maps.event.addDomListener(window, 'load', function() {
                map = new google.maps.Map(document.getElementById('map-canvas'), {
                    center: { lat: 38, lng: 9.1 },
                    zoom: 2.8,
                    styles: mapStyle,
                    disableDefaultUI: true,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_CENTER
                    }
                });

                // map.data.addGeoJson(
                //     'https://storage.googleapis.com/mapsdevsite/json/google.json');

                map.data.setStyle(styleFeature);

                map.data.addListener('mouseover', function(e) {
                    map.data.setStyle(styleFeature);
                });

                map.data.addListener('mouseout', function(e) {
                    map.data.setStyle(styleFeature);
                });

                


                // Get the earthquake data (JSONP format)
                // This feed is a copy from the USGS feed, you can find the originals here:
                //   http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
                var script = document.createElement('script');
                script.setAttribute('src',
                    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojsonp');
                document.getElementsByTagName('head')[0].appendChild(script);
            });

            // Defines the callback function referenced in the jsonp file.
            function eqfeed_callback(data) {
                map.data.addGeoJson(data);
            }

            function styleFeature(feature) {

                var low = [326, 97, 45];   // color of mag 1.0
                var high = [333, 79, 35];  // color of mag 6.0 and above
                var minMag = 4.5;
                var maxMag = 6.5

                // fraction represents where the value sits between the min and max
                var fraction = (Math.min(feature.getProperty('mag'), maxMag) - minMag) /
                    (maxMag - minMag);
                
                var color = interpolateHsl(low, high, fraction);

                return {
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        strokeWeight: 5,
                        strokeColor: 'rgba(255,255,255,0.4)',
                        fillColor: color,
                        fillOpacity: 4 / feature.getProperty('mag'),
                        // while an exponent would technically be correct, quadratic looks nicer
                        scale: Math.pow(feature.getProperty('mag'), 1.5)
                    },
                    zIndex: Math.floor(feature.getProperty('mag'))
                };
            }

            function interpolateHsl(lowHsl, highHsl, fraction) {
                var color = [];
                for (var i = 0; i < 3; i++) {
                    // Calculate color based on the fraction.
                    color[i] = (highHsl[i] - lowHsl[i]) * fraction + lowHsl[i];
                }
                return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
            }</script>`)
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
    

export default Test01;