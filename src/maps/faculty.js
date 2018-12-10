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
  }

 

  projection() {
    return geoMercator()
      .center([0, 5 ])
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
      .rotate([-240,])
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

          <defs>
            <clipPath id="myCircle">
               <circle cx={ this.projection()([-86.9081,40.4259])[0] } cy={ this.projection()([-86.9081,40.4259])[1]  } r="100" fill="#FFFFFF" />
            </clipPath>
         </defs>
         <image width= "100" height="100" xlinkHref="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjIoIOQu4TfAhVlmeAKHZ4nCH8QjRx6BAgBEAU&url=https%3A%2F%2Fwww.cbssports.com%2Fcollege-basketball%2Fgametracker%2Frecap%2FNCAAB_20171230_LPSCMB%40PURDUE%2F&psig=AOvVaw1QAnoVuVquArpsyfeTKfy1&ust=1543954025820988" clip-path="url(#myCircle)" />
      </svg>
        <form >
          <input type="range" name="foo" min="2015" max="2018" id = "rangeSlider" onChange = {this.test}></input>
          <output for="foo" onforminput="value = foo.valueAsNumber;" ></output>
        </form>
      </div>
    )
  }
}

class VisitingScholars extends BaseMap {
  constructor() {
    super()
    this.state = {
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



export default  VisitingScholars;