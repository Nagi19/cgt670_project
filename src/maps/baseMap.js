import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import Data from '../jsons/worldMap'
import Names from '../jsons/countryNames'
import "../styling/maps.css"
import "../styling/home.css"
import mapview from '../PURDUE.svg';
import $ from 'jquery';
import * as d3 from "d3";


class BaseMap extends Component {
  constructor() {
    super()
    this.state = {
      showPopup: true,
      worldData: feature(Data, Data.objects.countries).features,
      countries : Names,
      land: [],
      borders : [],
      showStore : false,
      testRandom :10,
      allCities: {},
      cities: [
        {"Year": "2015", "Country": "Australia", "coordinates": [149.08,-35.15], "Capital": "Canberra", "Count": "2"},
        {"Year": "2015", "Country": "Bahamas", "coordinates": [-77.20,25.05], "Capital": "Nassau", "Count": "2"},
        {"Year": "2015", "Country": "Bangladesh", "coordinates": [90.26,23.43], "Capital": "Dhaka", "Count": "1"},
        {"Year": "2015", "Country": "Belgium", "coordinates": [4 ,50.51], "Capital": "Bruxelles-Brussel", "Count": "1"},
        {"Year": "2015", "Country": "Canada", "coordinates": [-75.42,45.27], "Capital": "Ottawa-Gatineau", "Count": "3"},
        {"Year": "2015", "Country": "Chile", "coordinates": [-70.40,-33.24], "Capital": "Santiago", "Count": "1"},
        {"Year": "2015", "Country": "China", "coordinates": [116.20,39.55], "Capital": "Beijing", "Count": "161"},
        {"Year": "2015", "Country": "Colombia", "coordinates": [-74.00,4], "Capital": "Bogot\u00e1", "Count": "1"},
        {"Year": "2015", "Country": "Ecuador", "coordinates": [-78.35,0], "Capital": "Quito", "Count": "2"},
        {"Year": "2015", "Country": "Egypt", "coordinates": [31.14,30.01], "Capital": "Al-Qahirah (Cairo)", "Count": "1"},
        {"Year": "2015", "Country": "Germany", "coordinates": [13.25,52.30], "Capital": "Berlin", "Count": "2"},
        {"Year": "2015", "Country": "Ghana", "coordinates": [0,5], "Capital": "Accra", "Count": "1"},
        {"Year": "2015", "Country": "India", "coordinates": [77.13,28.37], "Capital": "Delhi", "Count": "73"},
        {"Year": "2015", "Country": "Indonesia", "coordinates": [106.49, -6], "Capital": "Jakarta", "Count": "10"},
        {"Year": "2015", "Country": "Ireland", "coordinates": [-6,53.21], "Capital": "Dublin", "Count": "1"},
        {"Year": "2015", "Country": "Kazakhstan", "coordinates": [71.30,51.10], "Capital": "Astana", "Count": "3"},
        {"Year": "2015", "Country": "Malaysia", "coordinates": [101.41,3], "Capital": "Kuala Lumpur", "Count": "1"},
        {"Year": "2015", "Country": "Nigeria", "coordinates": [7,9.05], "Capital": "Abuja", "Count": "3"},
        {"Year": "2015", "Country": "Philippines", "coordinates": [121.03,14.40], "Capital": "Manila", "Count": "1"},
        {"Year": "2015", "Country": "Poland", "coordinates": [21.00,52.13], "Capital": "Warszawa (Warsaw)", "Count": "1"},
        {"Year": "2015", "Country": "Republic of Korea", "coordinates": [126.58,37.31], "Capital": "Seoul", "Count": "42"},
        {"Year": "2015", "Country": "Russian Federation", "coordinates": [37.35,55.45], "Capital": "Moskva (Moscow)", "Count": "1"},
        {"Year": "2015", "Country": "Saudi Arabia", "coordinates": [46.42,24.41], "Capital": "Ar-Riyadh (Riyadh)", "Count": "1"},
        {"Year": "2015", "Country": "Spain", "coordinates": [-3,40.25], "Capital": "Madrid", "Count": "1"},
        {"Year": "2015", "Country": "Sweden", "coordinates": [18.03,59.20], "Capital": "Stockholm", "Count": "4"},
        {"Year": "2015", "Country": "Switzerland", "coordinates": [7,46.57], "Capital": "Bern", "Count": "2"},
        {"Year": "2015", "Country": "Thailand", "coordinates": [100.35,13.45], "Capital": "Krung Thep (Bangkok)", "Count": "2"},
        {"Year": "2015", "Country": "Turkey", "coordinates": [32.54,39.57], "Capital": "Ankara", "Count": "4"},
        {"Year": "2015", "Country": "Uganda", "coordinates": [32.30,0], "Capital": "Kampala", "Count": "2"},
        {"Year": "2015", "Country": "United Kingdom", "coordinates": [0, 51.50], "Capital": "London", "Count": "1"},
      ],

    }
    this.join = this.join.bind(this);
    this.test = this.test.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

 

  projection() {
    return geoMercator()
      .center([0, 5 ])
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
      .rotate([-240,])
  }

  togglePopup() {
    return 
    
  }

instructions(coordinates) {
    return `M  ${ this.projection()(coordinates)[0]} ${this.projection()(coordinates)[1]}
            Q ${(this.projection()([-86.9081,40.4259])[0] + this.projection()(coordinates)[0] )/2 + 100} ${(this.projection()([-86.9081,40.4259])[1] + this.projection()(coordinates)[1] )/2 + 100}
            ${this.projection()([-86.9081,40.4259])[0]} ${this.projection()([-86.9081,40.4259])[1]}
            `;
  }

  join(){
    var x = this.state.worldData;
    var y = this.state.countries;
   x.filter(function(d) {
        return Object.keys(y).forEach(function( key) {
          if (d.id === parseInt(key)) 
          {
            return d.name = y[key];}
     }) })
 }

 handleMarkerClick(markerIndex) {
  console.log("Marker: ", this.state.cities[markerIndex]);
  this.setState({showStore : true,
    testRandom : 111 });
 
    }

  test(){
    var el, newPoint, newPlace, offset;
    el = $("input[type='range']");
          var width = el.width();
          console.log(el);
          newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
          offset = 25;
  
          if (newPoint < 0) { newPlace = 0; }
          else if (newPoint > 1) { newPlace = width; }
          else { newPlace = width * newPoint + offset; offset -= newPoint; }
          console.log(this);
          this.setState({cities : this.state.allCities[parseInt(el.val())]})
          el
            .next("output")
            .css({
              left: newPlace,
              marginLeft: offset + "%",
              position : 'absolute',
            })
              .text(el.val());
          }
  
  componentDidMount() {
    this.join();
   
  }
  render() {
    var color = d3.scaleOrdinal()
		//this assumes you have 3 groups of data//﻿each of the domains corresponds to a color set
        .domain([1, 10,  25, 50,75,100, 161])
        .range([ "#90CAF9", "#64B5F6", "#42A5F5", "2196f3","#1E88E5", "1976d2","#0D47A1"]);
    return (   
        <div>     
        <svg className = "map"   viewBox="0 0 700 400">

         <defs>
            <marker
              id="arrow"
              markerUnits="strokeWidth"
              markerWidth="12"
              markerHeight="12"
              viewBox="0 0 12 12"
              fill = "#1E88E5"
              refX = "6"
              refY= "6"
              orient="auto">
              <path d="M2,2 L10,6 L2,10 L6,6 L2,2"  ></path>
            </marker>
          </defs>


            <g className="countries"  style={{display: this.state.showStore ? 'none' : 'block' }}>
            {
                this.state.worldData.map((d,i) => (     
                <path
                    key={ `path-${ i }` }
                    d={ geoPath().projection(this.projection())(d) }
                    className="country"
                    fill={ `rgba(38,50,56,.2)` }
                    stroke="#FFFFFF"
                    strokeWidth={ 0.5 }
                />
                ))
            }
            </g>   
       
      
      <g className="curve" style={{display: this.state.showStore ? 'none' : 'block' }}>
          {
            this.state.cities.map((city, i) => (
              <path
                d = {`M  ${ this.projection()(city.coordinates)[0]} ${this.projection()(city.coordinates)[1]}
                Q ${(this.projection()([-86.9081,40.4259])[0] + this.projection()(city.coordinates)[0] )/2 } 
                ${(this.projection()([-86.9081,40.4259])[1] + this.projection()(city.coordinates)[1] )/2 - 75}
                ${this.projection()([-86.9081,40.4259])[0] } ${this.projection()([-86.9081,40.4259])[1]  }
                ` }         
                  stroke= {color(city.Count)}
                  stroke-width = "2"
                  fill = "#fff"
                  fill-opacity = "0"
                  marker-start= "url(#arrow)"
                  marker-mid= "url(#arrow)"
              >             
              </path>
            ))
        }
      </g>




          {
            this.state.cities.map((city, i) => (
              <path transform="translate(457, 156)" >
              <defs>
              <marker id="Triangle"  refX={this.projection()([-86.9081,40.4259])[0]} refY={this.projection()([-86.9081,40.4259])[1]}
                  markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>
            </defs>
          
            <polyline points="10,90 50,80 90,20" fill="none" stroke="black" 
                stroke-width="2" marker-start="url(#Triangle)" />
                </path>
            ))
        }


      <defs>
        <pattern id = "attachedImage" height = "100%" width = "100%"            
                      patternContentUnits = "objectBoundingBox">
          <image  href={mapview} preserveAspectRatio = "none" 
                  width = "1" height = "1"/>
        </pattern>
      </defs>
    <circle cx = { this.projection()([-86.9081,40.4259])[0] } cy ={ this.projection()([-86.9081,40.4259])[1] } r = "2%" fill = "url(#attachedImage)">
     <title className = "tooltip" >Purdue Polytechnic Institute</title>
    </circle>

        
        
  
        
        <g className="markers" style={{display: this.state.showStore ? 'none' : 'block' }}>
          {
            this.state.cities.map((city, i) => (
              <circle
                key={ `marker-${i}` }
                cx={ this.projection()(city.coordinates)[0] }
                cy={ this.projection()(city.coordinates)[1] }
                r={ Math.sqrt(city.Count)  }
                fill={color(city.Count)}
                stroke="#FFFFFF"
                className="marker"
                onClick={ () => {this.togglePopup(city)} }
              >
              <title>{city.Country}</title>

               
              </circle>
            ))
          }
        </g>
       
      

          <g style={{display: this.state.showStore ? 'block' : 'none' }}>
            <path d="M 100 350 q 150 -300 300 0" stroke="blue"
                stroke-width= {this.state.testRandom} fill="none"  />
          </g>

         
      </svg>
        <form >
          <input type="range" name="foo" min="2015" max="2018"  onChange = {this.test}></input>
          <output for="foo" onforminput="value = foo.valueAsNumber;" ></output>
        </form>
      </div>
    )
  }
}

class StudentEnrollment extends BaseMap {
  constructor() {
    super()
    this.state = {
      showPopup: true,
      worldData: feature(Data, Data.objects.countries).features,
      countries : Names,
      land: [],
      borders : [],
      cities : [        
        {"Year": "2015", "Country": "Australia", "coordinates": [149.08,-35.15], "Capital": "Canberra", "Count": "2"},
        {"Year": "2015", "Country": "Bahamas", "coordinates": [-77.20,25.05], "Capital": "Nassau", "Count": "2"},
        {"Year": "2015", "Country": "Bangladesh", "coordinates": [90.26,23.43], "Capital": "Dhaka", "Count": "1"},
        {"Year": "2015", "Country": "Belgium", "coordinates": [4 ,50.51], "Capital": "Bruxelles-Brussel", "Count": "1"},
        {"Year": "2015", "Country": "Canada", "coordinates": [-75.42,45.27], "Capital": "Ottawa-Gatineau", "Count": "3"},
        {"Year": "2015", "Country": "Chile", "coordinates": [-70.40,-33.24], "Capital": "Santiago", "Count": "1"},
        {"Year": "2015", "Country": "China", "coordinates": [116.20,39.55], "Capital": "Beijing", "Count": "161"},
        {"Year": "2015", "Country": "Colombia", "coordinates": [-74.00,4], "Capital": "Bogot\u00e1", "Count": "1"},
        {"Year": "2015", "Country": "Ecuador", "coordinates": [-78.35,0], "Capital": "Quito", "Count": "2"},
        {"Year": "2015", "Country": "Egypt", "coordinates": [31.14,30.01], "Capital": "Al-Qahirah (Cairo)", "Count": "1"},
        {"Year": "2015", "Country": "Germany", "coordinates": [13.25,52.30], "Capital": "Berlin", "Count": "2"},
        {"Year": "2015", "Country": "Ghana", "coordinates": [0,5], "Capital": "Accra", "Count": "1"},
        {"Year": "2015", "Country": "India", "coordinates": [77.13,28.37], "Capital": "Delhi", "Count": "73"},
        {"Year": "2015", "Country": "Indonesia", "coordinates": [106.49, -6], "Capital": "Jakarta", "Count": "10"},
        {"Year": "2015", "Country": "Ireland", "coordinates": [-6,53.21], "Capital": "Dublin", "Count": "1"},
        {"Year": "2015", "Country": "Kazakhstan", "coordinates": [71.30,51.10], "Capital": "Astana", "Count": "3"},
        {"Year": "2015", "Country": "Malaysia", "coordinates": [101.41,3], "Capital": "Kuala Lumpur", "Count": "1"},
        {"Year": "2015", "Country": "Nigeria", "coordinates": [7,9.05], "Capital": "Abuja", "Count": "3"},
        {"Year": "2015", "Country": "Philippines", "coordinates": [121.03,14.40], "Capital": "Manila", "Count": "1"},
        {"Year": "2015", "Country": "Poland", "coordinates": [21.00,52.13], "Capital": "Warszawa (Warsaw)", "Count": "1"},
        {"Year": "2015", "Country": "Republic of Korea", "coordinates": [126.58,37.31], "Capital": "Seoul", "Count": "42"},
        {"Year": "2015", "Country": "Russian Federation", "coordinates": [37.35,55.45], "Capital": "Moskva (Moscow)", "Count": "1"},
        {"Year": "2015", "Country": "Saudi Arabia", "coordinates": [46.42,24.41], "Capital": "Ar-Riyadh (Riyadh)", "Count": "1"},
        {"Year": "2015", "Country": "Spain", "coordinates": [-3,40.25], "Capital": "Madrid", "Count": "1"},
        {"Year": "2015", "Country": "Sweden", "coordinates": [18.03,59.20], "Capital": "Stockholm", "Count": "4"},
        {"Year": "2015", "Country": "Switzerland", "coordinates": [7,46.57], "Capital": "Bern", "Count": "2"},
        {"Year": "2015", "Country": "Thailand", "coordinates": [100.35,13.45], "Capital": "Krung Thep (Bangkok)", "Count": "2"},
        {"Year": "2015", "Country": "Turkey", "coordinates": [32.54,39.57], "Capital": "Ankara", "Count": "4"},
        {"Year": "2015", "Country": "Uganda", "coordinates": [32.30,0], "Capital": "Kampala", "Count": "2"},
        {"Year": "2015", "Country": "United Kingdom", "coordinates": [0, 51.50], "Capital": "London", "Count": "1"},
    ],
      allCities:         {
        "2015" : [
          {"Year": "2015", "Country": "Australia", "coordinates": [149.08,-35.15], "Capital": "Canberra", "Count": "2"},
          {"Year": "2015", "Country": "Bahamas", "coordinates": [-77.20,25.05], "Capital": "Nassau", "Count": "2"},
          {"Year": "2015", "Country": "Bangladesh", "coordinates": [90.26,23.43], "Capital": "Dhaka", "Count": "1"},
          {"Year": "2015", "Country": "Belgium", "coordinates": [4 ,50.51], "Capital": "Bruxelles-Brussel", "Count": "1"},
          {"Year": "2015", "Country": "Canada", "coordinates": [-75.42,45.27], "Capital": "Ottawa-Gatineau", "Count": "3"},
          {"Year": "2015", "Country": "Chile", "coordinates": [-70.40,-33.24], "Capital": "Santiago", "Count": "1"},
          {"Year": "2015", "Country": "China", "coordinates": [116.20,39.55], "Capital": "Beijing", "Count": "161"},
          {"Year": "2015", "Country": "Colombia", "coordinates": [-74.00,4], "Capital": "Bogot\u00e1", "Count": "1"},
          {"Year": "2015", "Country": "Ecuador", "coordinates": [-78.35,0], "Capital": "Quito", "Count": "2"},
          {"Year": "2015", "Country": "Egypt", "coordinates": [31.14,30.01], "Capital": "Al-Qahirah (Cairo)", "Count": "1"},
          {"Year": "2015", "Country": "Germany", "coordinates": [13.25,52.30], "Capital": "Berlin", "Count": "2"},
          {"Year": "2015", "Country": "Ghana", "coordinates": [0,5], "Capital": "Accra", "Count": "1"},
          {"Year": "2015", "Country": "India", "coordinates": [77.13,28.37], "Capital": "Delhi", "Count": "73"},
          {"Year": "2015", "Country": "Indonesia", "coordinates": [106.49, -6], "Capital": "Jakarta", "Count": "10"},
          {"Year": "2015", "Country": "Ireland", "coordinates": [-6,53.21], "Capital": "Dublin", "Count": "1"},
          {"Year": "2015", "Country": "Kazakhstan", "coordinates": [71.30,51.10], "Capital": "Astana", "Count": "3"},
          {"Year": "2015", "Country": "Malaysia", "coordinates": [101.41,3], "Capital": "Kuala Lumpur", "Count": "1"},
          {"Year": "2015", "Country": "Nigeria", "coordinates": [7,9.05], "Capital": "Abuja", "Count": "3"},
          {"Year": "2015", "Country": "Philippines", "coordinates": [121.03,14.40], "Capital": "Manila", "Count": "1"},
          {"Year": "2015", "Country": "Poland", "coordinates": [21.00,52.13], "Capital": "Warszawa (Warsaw)", "Count": "1"},
          {"Year": "2015", "Country": "Republic of Korea", "coordinates": [126.58,37.31], "Capital": "Seoul", "Count": "42"},
          {"Year": "2015", "Country": "Russian Federation", "coordinates": [37.35,55.45], "Capital": "Moskva (Moscow)", "Count": "1"},
          {"Year": "2015", "Country": "Saudi Arabia", "coordinates": [46.42,24.41], "Capital": "Ar-Riyadh (Riyadh)", "Count": "1"},
          {"Year": "2015", "Country": "Spain", "coordinates": [-3,40.25], "Capital": "Madrid", "Count": "1"},
          {"Year": "2015", "Country": "Sweden", "coordinates": [18.03,59.20], "Capital": "Stockholm", "Count": "4"},
          {"Year": "2015", "Country": "Switzerland", "coordinates": [7,46.57], "Capital": "Bern", "Count": "2"},
          {"Year": "2015", "Country": "Thailand", "coordinates": [100.35,13.45], "Capital": "Krung Thep (Bangkok)", "Count": "2"},
          {"Year": "2015", "Country": "Turkey", "coordinates": [32.54,39.57], "Capital": "Ankara", "Count": "4"},
          {"Year": "2015", "Country": "Uganda", "coordinates": [32.30,0], "Capital": "Kampala", "Count": "2"},
          {"Year": "2015", "Country": "United Kingdom", "coordinates": [0, 51.50], "Capital": "London", "Count": "1"},
        ],
        "2016": [
            {"Year": "2016", "Country": "Australia", "coordinates": [149.08,-35.15], "Capital": "Canberra", "Count": "1"},
            {"Year": "2016", "Country": "Bahamas", "coordinates": [-77.20,25.05], "Capital": "Nassau", "Count": "2"},
            {"Year": "2016", "Country": "Bangladesh", "coordinates": [90.26,23.43], "Capital": "Dhaka", "Count": "1"},
            {"Year": "2016", "Country": "Belgium", "coordinates": [4,50.51], "Capital": "Bruxelles-Brussel", "Count": "1"},
            {"Year": "2016", "Country": "Brazil", "coordinates": [-47.55,-15.47], "Capital": "Bras\u00edlia", "Count": "2"},
            {"Year": "2016", "Country": "Canada", "coordinates": [-75.42,45.27], "Capital": "Ottawa-Gatineau", "Count": "5"},
            {"Year": "2016", "Country": "Chile", "coordinates": [-70.40,-33.24], "Capital": "Santiago", "Count": "1"},
            {"Year": "2016", "Country": "China", "coordinates": [116.20,39.55], "Capital": "Beijing", "Count": "231"},
            {"Year": "2016", "Country": "Colombia", "coordinates": [-74.00,4], "Capital": "Bogot\u00e1", "Count": "1"},
            {"Year": "2016", "Country": "Ecuador", "coordinates": [-78.35,0], "Capital": "Quito", "Count": "1"},
            {"Year": "2016", "Country": "Egypt", "coordinates": [31.14,30.01], "Capital": "Al-Qahirah (Cairo)", "Count": "1"},
            {"Year": "2016", "Country": "Germany", "coordinates": [13.25,52.30], "Capital": "Berlin", "Count": "11"},
            {"Year": "2016", "Country": "India", "coordinates": [77.13,28.37], "Capital": "Delhi", "Count": "73"},
            {"Year": "2016", "Country": "Indonesia", "coordinates": [106.49,-6], "Capital": "Jakarta", "Count": "6"},
            {"Year": "2016", "Country": "Ireland", "coordinates": [-6,53.21], "Capital": "Dublin", "Count": "3"},
            {"Year": "2016", "Country": "Italy", "coordinates": [12.29,41.54], "Capital": "Roma (Rome)", "Count": "1"},
            {"Year": "2016", "Country": "Jordan", "coordinates": [35.52,31.57], "Capital": "Amman", "Count": "1"},
            {"Year": "2016", "Country": "Kazakhstan", "coordinates": [71.30,51.10], "Capital": "Astana", "Count": "1"},
            {"Year": "2016", "Country": "Lebanon", "coordinates": [35.31,33.53], "Capital": "Bayrut (Beirut)", "Count": "1"},
            {"Year": "2016", "Country": "Malaysia", "coordinates": [101.41,3], "Capital": "Kuala Lumpur", "Count": "5"},
            {"Year": "2016", "Country": "Mexico", "coordinates": [-99.10,19.20], "Capital": "Ciudad de M\u00e9xico (Mexico City)", "Count": "1"},
            {"Year": "2016", "Country": "Nigeria", "coordinates": [7,9.05], "Capital": "Abuja", "Count": "2"},
            {"Year": "2016", "Country": "Pakistan", "coordinates": [73.10,33.40], "Capital": "Islamabad", "Count": "2"},
            {"Year": "2016", "Country": "Panama", "coordinates": [-79.25,9.00], "Capital": "Ciudad de Panam\u00e1 (Panama City)", "Count": "1"},
            {"Year": "2016", "Country": "Poland", "coordinates": [21.00,52.13], "Capital": "Warszawa (Warsaw)", "Count": "1"},
            {"Year": "2016", "Country": "Republic of Korea", "coordinates": [126.58,37.31], "Capital": "Seoul", "Count": "41"},
            {"Year": "2016", "Country": "Russian Federation", "coordinates": [37.35,55.45], "Capital": "Moskva (Moscow)", "Count": "2"},
            {"Year": "2016", "Country": "Saudi Arabia", "coordinates": [46.42,24.41], "Capital": "Ar-Riyadh (Riyadh)", "Count": "3"},
            {"Year": "2016", "Country": "Spain", "coordinates": [-3,40.25], "Capital": "Madrid", "Count": "2"},
            {"Year": "2016", "Country": "Sweden", "coordinates": [18.03,59.20], "Capital": "Stockholm", "Count": "4"},
            {"Year": "2016", "Country": "Switzerland", "coordinates": [7,46.57], "Capital": "Bern", "Count": "4"},
            {"Year": "2016", "Country": "Thailand", "coordinates": [100.35,13.45], "Capital": "Krung Thep (Bangkok)", "Count": "10"},
            {"Year": "2016", "Country": "Turkey", "coordinates": [32.54,39.57], "Capital": "Ankara", "Count": "4"},
            {"Year": "2016", "Country": "Venezuela", "coordinates": [-66.55,10.30], "Capital": "Caracas", "Count": "2"},
            {"Year": "2016", "Country": "Syria", "coordinates": [36,33], "Capital": "Dimashq (Damascus)", "Count": "1"},
            {"Year": "2016", "Country": "United Kingdom", "coordinates":[0, 51.50], "Capital": "London", "Count": "3"},
        ],
        "2017" : [
            {"Year": "2017", "Country": "Argentina", "coordinates": [-60.00,-36.30], "Capital": "Buenos Aires", "Count": "1"},
            {"Year": "2017", "Country": "Australia", "coordinates": [149.08,-35.15], "Capital": "Canberra", "Count": "1"},
            {"Year": "2017", "Country": "Bahamas", "coordinates": [-77.20,25.05], "Capital": "Nassau", "Count": "2"},
            {"Year": "2017", "Country": "Bangladesh", "coordinates": [90.26,23.43], "Capital": "Dhaka", "Count": "2"},
            {"Year": "2017", "Country": "Belgium", "coordinates": [ 4, 50.51], "Capital": "Bruxelles-Brussel", "Count": "2"},
            {"Year": "2017", "Country": "Bolivia", "coordinates": [-68.10,-16.20], "Capital": "La Paz", "Count": "2"},
            {"Year": "2017", "Country": "Brazil", "coordinates": [-47.55,-15.47], "Capital": "Bras\u00edlia", "Count": "3"},
            {"Year": "2017", "Country": "Canada", "coordinates": [-75.42,45.27], "Capital": "Ottawa-Gatineau", "Count": "7"},
            {"Year": "2017", "Country": "China", "coordinates": [116.20,39.55], "Capital": "Beijing", "Count": "219"},
            {"Year": "2017", "Country": "Colombia", "coordinates": [-74.00,4], "Capital": "Bogot\u00e1", "Count": "1"},
            {"Year": "2017", "Country": "Costa Rica", "coordinates": [-84.02,9.55], "Capital": "San Jos\u00e9", "Count": "1"},
            {"Year": "2017", "Country": "Ecuador", "coordinates": [-78.35,0], "Capital": "Quito", "Count": "1"},
            {"Year": "2017", "Country": "Egypt", "coordinates": [31.14,30.01], "Capital": "Al-Qahirah (Cairo)", "Count": "1"},
            {"Year": "2017", "Country": "Germany", "coordinates": [13.25,52.30], "Capital": "Berlin", "Count": "3"},
            {"Year": "2017", "Country": "Honduras", "coordinates": [-87.14,14.05], "Capital": "Tegucigalpa", "Count": "1"},
            {"Year": "2017", "Country": "India", "coordinates": [77.13,28.37], "Capital": "Delhi", "Count": "82"},
            {"Year": "2017", "Country": "Indonesia", "coordinates": [106.49,-6], "Capital": "Jakarta", "Count": "7"},
            {"Year": "2017", "Country": "Ireland", "coordinates": [-6,53.21], "Capital": "Dublin", "Count": "6"},
            {"Year": "2017", "Country": "Italy", "coordinates": [12.29,41.54], "Capital": "Roma (Rome)", "Count": "1"},
            {"Year": "2017", "Country": "Jamaica", "coordinates": [-76.50,18.00], "Capital": "Kingston", "Count": "1"},
            {"Year": "2017", "Country": "Jordan", "coordinates": [35.52,31.57], "Capital": "Amman", "Count": "1"},
            {"Year": "2017", "Country": "Kenya", "coordinates": [36.48,-1], "Capital": "Nairobi", "Count": "1"},
            {"Year": "2017", "Country": "Malaysia", "coordinates": [101.41,3], "Capital": "Kuala Lumpur", "Count": "4"},
            {"Year": "2017", "Country": "Mexico", "coordinates": [-99.10,19.20], "Capital": "Ciudad de M\u00e9xico (Mexico City)", "Count": "3"},
            {"Year": "2017", "Country": "Netherlands", "coordinates": [4,52.23], "Capital": "Amsterdam", "Count": "1"},
            {"Year": "2017", "Country": "New Zealand", "coordinates": [174.46,-41.19], "Capital": "Wellington", "Count": "1"},
            {"Year": "2017", "Country": "Nigeria", "coordinates": [7,9.05], "Capital": "Abuja", "Count": "4"},
            {"Year": "2017", "Country": "Pakistan", "coordinates": [73.10,33.40], "Capital": "Islamabad", "Count": "1"},
            {"Year": "2017", "Country": "Panama", "coordinates": [-79.25,9.00], "Capital": "Ciudad de Panam\u00e1 (Panama City)", "Count": "2"},
            {"Year": "2017", "Country": "Peru", "coordinates": [-77.00,-12.00], "Capital": "Lima", "Count": "1"},
            {"Year": "2017", "Country": "Poland", "coordinates": [21.00,52.13], "Capital": "Warszawa (Warsaw)", "Count": "2"},
            {"Year": "2017", "Country": "Portugal", "coordinates": [-9.10,38.42], "Capital": "Lisboa (Lisbon)", "Count": "2"},
            {"Year": "2017", "Country": "Republic of Korea", "coordinates": [126.58,37.31], "Capital": "Seoul", "Count": "51"},
            {"Year": "2017", "Country": "Romania", "coordinates": [26.10,44.27], "Capital": "Bucuresti (Bucharest)", "Count": "1"},
            {"Year": "2017", "Country": "Russian Federation", "coordinates": [37.35,55.45], "Capital": "Moskva (Moscow)", "Count": "2"},
            {"Year": "2017", "Country": "Saudi Arabia", "coordinates": [46.42,24.41], "Capital": "Ar-Riyadh (Riyadh)", "Count": "2"},
            {"Year": "2017", "Country": "Spain", "coordinates": [-3,40.25], "Capital": "Madrid", "Count": "2"},
            {"Year": "2017", "Country": "Switzerland", "coordinates": [7,46.57], "Capital": "Bern", "Count": "4"},
            {"Year": "2017", "Country": "Thailand", "coordinates": [100.35,13.45], "Capital": "Krung Thep (Bangkok)", "Count": "4"},
            {"Year": "2017", "Country": "Turkey", "coordinates": [32.54,39.57], "Capital": "Ankara", "Count": "4"},
            {"Year": "2017", "Country": "Venezuela", "coordinates": [-66.55,10.30], "Capital": "Caracas", "Count": "4"},

            ],
        "2018" : [
        {"Year": "2018", "Country": "Argentina", "coordinates": [-60.00,-36.30], "Capital": "Buenos Aires", "Count": "2"},
            {"Year": "2018", "Country": "Australia", "coordinates": [149.08,-35.15], "Capital": "Canberra", "Count": "5"},
            {"Year": "2018", "Country": "Bahamas", "coordinates": [-77.20,25.05], "Capital": "Nassau", "Count": "1"},
            {"Year": "2018", "Country": "Bangladesh", "coordinates": [90.26,23.43], "Capital": "Dhaka", "Count": "2"},
            {"Year": "2018", "Country": "Belgium", "coordinates": [4,50.51], "Capital": "Bruxelles-Brussel", "Count": "2"},
            {"Year": "2018", "Country": "Bolivia", "coordinates": [-68.10,-16.20], "Capital": "La Paz", "Count": "1"},
            {"Year": "2018", "Country": "Brazil", "coordinates": [-47.55,-15.47], "Capital": "Bras\u00edlia", "Count": "4"},
            {"Year": "2018", "Country": "Canada", "coordinates": [-75.42,45.27], "Capital": "Ottawa-Gatineau", "Count": "7"},
            {"Year": "2018", "Country": "Chile", "coordinates": [-70.40,-33.24], "Capital": "Santiago", "Count": "2"},
            {"Year": "2018", "Country": "China", "coordinates": [116.20,39.55], "Capital": "Beijing", "Count": "218"},
            {"Year": "2018", "Country": "Colombia", "coordinates": [-74.00,4], "Capital": "Bogot\u00e1", "Count": "2"},
            {"Year": "2018", "Country": "Congo", "coordinates": [15.12,-4], "Capital": "Brazzaville", "Count": "1"},
            {"Year": "2018", "Country": "Costa Rica", "coordinates": [-84.02,9.55], "Capital": "San Jos\u00e9", "Count": "1"},
            {"Year": "2018", "Country": "Cyprus", "coordinates": [33.25,35.10], "Capital": "Lefkosia (Nicosia)", "Count": "1"},
            {"Year": "2018", "Country": "Egypt", "coordinates": [31.14,30.01], "Capital": "Al-Qahirah (Cairo)", "Count": "3"},
            {"Year": "2018", "Country": "El Salvador", "coordinates": [-89.10,13.40], "Capital": "San Salvador", "Count": "1"},
            {"Year": "2018", "Country": "Georgia", "coordinates": [44.50,41.43], "Capital": "Tbilisi", "Count": "1"},
            {"Year": "2018", "Country": "Germany", "coordinates": [13.25,52.30], "Capital": "Berlin", "Count": "4"},
            {"Year": "2018", "Country": "Ghana", "coordinates": [-0, 5], "Capital": "Accra", "Count": "2"},
            {"Year": "2018", "Country": "Guatemala", "coordinates": [-90.22,14.40], "Capital": "Ciudad de Guatemala (Guatemala City)", "Count": "2"},
            {"Year": "2018", "Country": "Honduras", "coordinates": [-87.14,14.05], "Capital": "Tegucigalpa", "Count": "2"},
            {"Year": "2018", "Country": "Hungary", "coordinates": [19.05,47.29], "Capital": "Budapest", "Count": "1"},
            {"Year": "2018", "Country": "India", "coordinates": [77.13,28.37], "Capital": "Delhi", "Count": "73"},
            {"Year": "2018", "Country": "Indonesia", "coordinates": [106.49,-6], "Capital": "Jakarta", "Count": "9"},
            {"Year": "2018", "Country": "Ireland", "coordinates": [-6,53.21], "Capital": "Dublin", "Count": "2"},
            {"Year": "2018", "Country": "Italy", "coordinates": [12.29,41.54], "Capital": "Roma (Rome)", "Count": "1"},
            {"Year": "2018", "Country": "Jamaica", "coordinates": [-76.50,18.00], "Capital": "Kingston", "Count": "1"},
            {"Year": "2018", "Country": "Jordan", "coordinates": [35.52,31.57], "Capital": "Amman", "Count": "1"},
            {"Year": "2018", "Country": "Lebanon", "coordinates": [35.31,33.53], "Capital": "Bayrut (Beirut)", "Count": "1"},
            {"Year": "2018", "Country": "Malaysia", "coordinates": [101.41,3], "Capital": "Kuala Lumpur", "Count": "4"},
            {"Year": "2018", "Country": "Mexico", "coordinates": [-99.10,19.20], "Capital": "Ciudad de M\u00e9xico (Mexico City)", "Count": "4"},
            {"Year": "2018", "Country": "Nigeria", "coordinates": [7,9.05], "Capital": "Abuja", "Count": "4"},
            {"Year": "2018", "Country": "Pakistan", "coordinates": [73.10,33.40], "Capital": "Islamabad", "Count": "2"},
            {"Year": "2018", "Country": "Panama", "coordinates": [-79.25,9.00], "Capital": "Ciudad de Panam\u00e1 (Panama City)", "Count": "1"},
            {"Year": "2018", "Country": "Philippines", "coordinates": [121.03,14.40], "Capital": "Manila", "Count": "1"},
            {"Year": "2018", "Country": "Republic of Korea", "coordinates": [126.58,37.31], "Capital": "Seoul", "Count": "51"},
            {"Year": "2018", "Country": "Romania", "coordinates": [26.10,44.27], "Capital": "Bucuresti (Bucharest)", "Count": "1"},
            {"Year": "2018", "Country": "Russian Federation", "coordinates": [37.35,55.45], "Capital": "Moskva (Moscow)", "Count": "2"},
            {"Year": "2018", "Country": "Spain", "coordinates": [-3,40.25], "Capital": "Madrid", "Count": "1"},
            {"Year": "2018", "Country": "Sweden", "coordinates": [18.03,59.20], "Capital": "Stockholm", "Count": "2"},
            {"Year": "2018", "Country": "Switzerland", "coordinates": [7,46.57], "Capital": "Bern", "Count": "4"},
            {"Year": "2018", "Country": "Thailand", "coordinates": [100.35,13.45], "Capital": "Krung Thep (Bangkok)", "Count": "4"},
            {"Year": "2018", "Country": "Turkey", "coordinates": [32.54,39.57], "Capital": "Ankara", "Count": "2"},
            {"Year": "2018", "Country": "United Arab Emirates", "coordinates": [54.22,24.28], "Capital": "Abu Zaby (Abu Dhabi)", "Count": "2"},
            {"Year": "2018", "Country": "Venezuela", "coordinates": [-66.55,10.30], "Capital": "Caracas", "Count": "2"},
            {"Year": "2018", "Country": "United Kingdom", "coordinates": [0, 51.50], "Capital": "London", "Count": "1"},
        ]
        }

    }
    this.join = this.join.bind(this);
  }
  
 
 
}


class VisitingScholars extends BaseMap {
  constructor() {
    super()
    this.state = {
      showPopup: true,
      worldData: feature(Data, Data.objects.countries).features,
      countries : Names,
      land: [],
      borders : [],
      cities: [ {"Year": "2015",  "coordinates": [-75.42,45.27],"Country": "Canada", "Count": "1"}
              , {"Year": "2015","coordinates":[116.20,39.55], "Country": "China", "Count": "2"}
              , {"Year": "2015", "coordinates": [80.13, 7.8],"Country": "Sri Lanka", "Count": "1"}
              , {"Year": "2015", "coordinates": [32.30,0],"Country": "Uganda", "Count": "1"}
              , {"Year": "2015","coordinates": [74.13,40.37], "Country": "United States", "Count": "5"}
     ],
      allCities: {
         "2015" :[ 
           {"Year": "2015", "coordinates":[-75.42,45.27],"Country": "Canada", "Count": "1"}
         , {"Year": "2015", "coordinates": [116.20,39.55],"Country": "China", "Count": "2"}
         , {"Year": "2015", "coordinates": [80.13, 7.8],"Country": "Sri Lanka", "Count": "1"}
         , {"Year": "2015", "coordinates": [77.13,28.37],"Country": "Uganda", "Count": "1"}
        ],
        "2016" :[ 
          {"Year": "2016", "coordinates": [116.20,39.55], "Country": "China", "Count": "1"}
         , {"Year": "2016", "coordinates": [80.13, 7.8],"Country": "Sri Lanka", "Count": "1"}
         , {"Year": "2016", "coordinates": [74.13,40.37],"Country": "United States", "Count": "6"}
      ],
      "2017" :[ 
           {"Year": "2017", "coordinates":[116.20,39.55],"Country": "China", "Count": "2"}
         , {"Year": "2017", "coordinates": [77.13,28.37],"Country": "India",  "Count": "1"}
         , {"Year": "2017", "coordinates": [74.13,40.37],"Country": "United States", "Count": "5"}
    ], 
    "2018": [ 
           {"Year": "2018", "coordinates": [149.08,-35.15],"Country": "Australia", "Count": "1"}
         , {"Year": "2018", "coordinates": [82.13,32.37], "Country": "Georgia", "Count": "1"}
         , {"Year": "2018", "coordinates": [74.13,40.37], "Country": "United States", "Count": "2"}
  ]
}
}
    this.join = this.join.bind(this);
  }
  
 
 
}

class StudyingAbroad extends BaseMap {
  constructor() {
    super()
    this.state = {
      showPopup: true,
      worldData: feature(Data, Data.objects.countries).features,
      countries : Names,
      land: [],
      borders : [],
      cities: [ {"Year": "2015",  "coordinates": [-75.42,45.27],"Country": "Canada", "Count": "1"}
              , {"Year": "2015","coordinates":[116.20,39.55], "Country": "China", "Count": "2"}
              , {"Year": "2015", "coordinates": [80.13, 7.8],"Country": "Sri Lanka", "Count": "1"}
              , {"Year": "2015", "coordinates": [32.30,0],"Country": "Uganda", "Count": "1"}
              , {"Year": "2015","coordinates": [74.13,40.37], "Country": "United States", "Count": "5"}
     ],
      allCities: {
         "2015" :[ 
           {"Year": "2015", "coordinates":[-75.42,45.27],"Country": "Canada", "Count": "1"}
         , {"Year": "2015", "coordinates": [116.20,39.55],"Country": "China", "Count": "2"}
         , {"Year": "2015", "coordinates": [80.13, 7.8],"Country": "Sri Lanka", "Count": "1"}
         , {"Year": "2015", "coordinates": [77.13,28.37],"Country": "Uganda", "Count": "1"}
        ],
        "2016" :[ 
          {"Year": "2016", "coordinates": [116.20,39.55], "Country": "China", "Count": "1"}
         , {"Year": "2016", "coordinates": [80.13, 7.8],"Country": "Sri Lanka", "Count": "1"}
         , {"Year": "2016", "coordinates": [74.13,40.37],"Country": "United States", "Count": "6"}
      ],
      "2017" :[ 
           {"Year": "2017", "coordinates":[116.20,39.55],"Country": "China", "Count": "2"}
         , {"Year": "2017", "coordinates": [77.13,28.37],"Country": "India",  "Count": "1"}
         , {"Year": "2017", "coordinates": [74.13,40.37],"Country": "United States", "Count": "5"}
    ], 
    "2018": [ 
           {"Year": "2018", "coordinates": [149.08,-35.15],"Country": "Australia", "Count": "1"}
         , {"Year": "2018", "coordinates": [82.13,32.37], "Country": "Georgia", "Count": "1"}
         , {"Year": "2018", "coordinates": [74.13,40.37], "Country": "United States", "Count": "2"}
  ]
}

    }
    this.join = this.join.bind(this);
  }
  
 
 
}

export { StudentEnrollment,VisitingScholars,  StudyingAbroad}