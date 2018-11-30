import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import Data from '../jsons/worldMap'
import Names from '../jsons/countryNames'
import "../styling/maps.css"
import $ from 'jquery';

class BaseMap extends Component {
  constructor() {
    super()
    this.state = {
      worldData: feature(Data, Data.objects.countries).features,
      countries : Names,
      land: [],
      borders : [],
      showStore : false,
      testRandom :10,

      cities: [
        { name: "Tokyo", coordinates: [139.6917,35.6895], population: 37843000 },
        { name: "Jakarta", coordinates: [106.8650,-6.1751], population: 30539000 },
        { name: "Delhi", coordinates: [77.1025,28.7041], population: 24998000 },
        { name: "Manila", coordinates: [120.9842,14.5995], population: 24123000 },
        { name: "Seoul", coordinates: [126.9780,37.5665], population: 23480000 },
        { name: "Karachi", coordinates: [67.0099,24.8615], population: 22123000 },
        { name: "Beijing", coordinates: [116.4074,39.9042], population: 21009000 },
        { name: "Guangzhou", coordinates: [113.2644,23.1291], population: 20597000 },
        { name: "Sao Paulo", coordinates: [-46.6333,-23.5505], population: 20365000 },
        { name: "Mexico City", coordinates: [-99.1332,19.4326], population: 20063000 },
        { name: "Osaka", coordinates: [135.5022,34.6937], population: 17444000 },
        { name: "Moscow", coordinates: [37.6173,55.7558], population: 16170000 },
        { name: "Dhaka", coordinates: [90.4125,23.8103], population: 15669000 },
        { name: "Greater Cairo", coordinates: [31.2357,30.0444], population: 15600000 },
        { name: "Bangkok", coordinates: [100.5018,13.7563], population: 14998000 },
        { name: "Buenos Aires", coordinates: [-58.3816,-34.6037], population: 14122000 },
        { name: "Tehran", coordinates: [51.3890,35.6892], population: 13532000 },
        { name: "Istanbul", coordinates: [28.9784,41.0082], population: 13287000 },
        { name: "Lagos", coordinates: [3.3792,6.5244], population: 13123000 },
        { name: "Shenzhen", coordinates: [114.0579,22.5431], population: 12084000 },
        { name: "Rio de Janeiro", coordinates: [-43.1729,-22.9068], population: 11727000 },
        { name: "Kinshasa", coordinates: [15.2663,-4.4419], population: 11587000 },
        { name: "Tianjin", coordinates: [117.3616,39.3434], population: 10920000 },
        { name: "Paris", coordinates: [2.3522,48.8566], population: 10858000 },
        { name: "Lima", coordinates: [-77.0428,-12.0464], population: 10750000 },
      ],

    }
    this.join = this.join.bind(this);
  }
  projection() {
    return geoMercator()
      .center([0, 5 ])
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
      .rotate([-240,0])
  }

instructions(coordinates) {
    return `M ${coordinates[0]},${coordinates[1]}
            Q ${(this.projection()([-86.9081,40.4259])[0] + coordinates[0] )/2},${(this.projection()([-86.9081,40.4259])[1] + coordinates[1] )/2}
            C  ${this.projection()([-86.9081,40.4259])[0]},${this.projection()([-86.9081,40.4259])[1]}
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
  
  componentDidMount() {
    this.join();
    
    // const startPoint = [25, 25];
    // const controlPoint = [300, 175];
    // const endPoint = [25, 325];
    // const test = (
    //   <path
    //     d={`
    //       M ${startPoint}
    //       Q ${controlPoint} ${endPoint}
    //     `}
    //     fill="none"
    //     stroke="hotpink"
    //     strokeWidth={5}
    //   />
    // )

    var el, newPoint, newPlace, offset;
    $("input[type='range']").change(function() {
          el = $(this);
          var width = el.width();
          console.log(el);
          newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
          offset = 23;
  
          if (newPoint < 0) { newPlace = 0; }
          else if (newPoint > 1) { newPlace = width; }
          else { newPlace = width * newPoint + offset; offset -= newPoint; }
          
          el
            .next("output")
            .css({
              left: newPlace,
              marginLeft: offset + "%",
              position : 'absolute',
            })
              .text(el.val());
          })
          .trigger('change');

   
  }
  render() {
    const test = () =>
      <path d="M 100 350 q 150 -300 300 0" stroke="blue"
      stroke-width= {this.state.testRandom} fill="none"  />
    
    return (   
        <div>     
        <svg className = "map"   viewBox="0 0 700 400">
            <g className="countries" id = "blah" style={{display: this.state.showStore ? 'none' : 'block' }}>
            {
                this.state.worldData.map((d,i) => (     
                <path
                    key={ `path-${ i }` }
                    d={ geoPath().projection(this.projection())(d) }
                    className="country"
                   // fill={ `rgba(38,50,56,${1 / this.state.worldData.length * i})` }
                    fill={ `rgba(38,50,56,.3)` }
                    stroke="#FFFFFF"
                    strokeWidth={ 0.5 }
                />
                ))
            }
            </g>   
        <g className="line" style={{display: this.state.showStore ? 'none' : 'block' }}>
          {
            this.state.cities.map((city, i) => (
              <line
                d = { this.instructions( this.projection()(city.coordinates)) }
                x1={ this.projection()(city.coordinates)[0] }
                y1={ this.projection()(city.coordinates)[1] }
                x2={ this.projection()([-86.9081,40.4259])[0] }
                y2={ this.projection()([-86.9081,40.4259])[1] }
                  stroke="#4fc3f7"
                  className="curveCardinal"
              />
            ))
        }
      </g>

        <g className="markers" style={{display: this.state.showStore ? 'none' : 'block' }}>
          {
            this.state.cities.map((city, i) => (
              <circle
                key={ `marker-${i}` }
                cx={ this.projection()(city.coordinates)[0] }
                cy={ this.projection()(city.coordinates)[1] }
                r={ city.population / 3000000 }
                fill="#4fc3f7"
                stroke="#FFFFFF"
                className="marker"
                onClick={ () => this.handleMarkerClick(i) }
              />
            ))
          }
        </g>
          <g style={{display: this.state.showStore ? 'block' : 'none' }}>
            <path d="M 100 350 q 150 -300 300 0" stroke="blue"
                stroke-width= {this.state.testRandom} fill="none"  />
          </g>
      </svg>
        <form>
          <input type="range" name="foo" min="2000" max="2018" id = "rangeSlider"></input>
          <output for="foo" onforminput="value = foo.valueAsNumber;"></output>
        </form>
      </div>
    )
  }
}

class StudentEnrollment extends BaseMap {
  constructor() {
    super()
    this.state = {
      worldData: feature(Data, Data.objects.countries).features,
      countries : Names,
      land: [],
      borders : [],

      cities: [
        { name: "Tokyo", coordinates: [139.6917,35.6895], population: 37843000 },
        { name: "Jakarta", coordinates: [106.8650,-6.1751], population: 30539000 },
        { name: "Delhi", coordinates: [77.1025,28.7041], population: 24998000 },
        { name: "Manila", coordinates: [120.9842,14.5995], population: 24123000 },
        { name: "Seoul", coordinates: [126.9780,37.5665], population: 23480000 },
        { name: "Karachi", coordinates: [67.0099,24.8615], population: 22123000 },
        { name: "Beijing", coordinates: [116.4074,39.9042], population: 21009000 },
        { name: "Guangzhou", coordinates: [113.2644,23.1291], population: 20597000 },
        { name: "Sao Paulo", coordinates: [-46.6333,-23.5505], population: 20365000 },
        { name: "Mexico City", coordinates: [-99.1332,19.4326], population: 20063000 },
        { name: "Osaka", coordinates: [135.5022,34.6937], population: 17444000 },
        { name: "Moscow", coordinates: [37.6173,55.7558], population: 16170000 },
        { name: "Dhaka", coordinates: [90.4125,23.8103], population: 15669000 },
        { name: "Greater Cairo", coordinates: [31.2357,30.0444], population: 15600000 },
        { name: "Bangkok", coordinates: [100.5018,13.7563], population: 14998000 },
        { name: "Buenos Aires", coordinates: [-58.3816,-34.6037], population: 14122000 },
        { name: "Tehran", coordinates: [51.3890,35.6892], population: 13532000 },
        { name: "Istanbul", coordinates: [28.9784,41.0082], population: 13287000 },
        { name: "Lagos", coordinates: [3.3792,6.5244], population: 13123000 },
        { name: "Shenzhen", coordinates: [114.0579,22.5431], population: 12084000 },
        { name: "Rio de Janeiro", coordinates: [-43.1729,-22.9068], population: 11727000 },
        { name: "Kinshasa", coordinates: [15.2663,-4.4419], population: 11587000 },
        { name: "Tianjin", coordinates: [117.3616,39.3434], population: 10920000 },
        { name: "Paris", coordinates: [2.3522,48.8566], population: 10858000 },
        { name: "Lima", coordinates: [-77.0428,-12.0464], population: 10750000 },
      ],

    }
    this.join = this.join.bind(this);
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

       cities: [
        { name: "Tokyo", coordinates: [139.6917,35.6895], population: 37843000 },
       
      ],

    }
    this.join = this.join.bind(this);
  }
  
 
 
}

class StudyingAbroad extends BaseMap {
  constructor() {
    super()
    this.state = {
      worldData: feature(Data, Data.objects.countries).features,
      countries : Names,
      land: [],
      borders : [],

       cities: [
        { name: "Tokyo", coordinates: [139.6917,35.6895], population: 37843000 },
       
      ],

    }
    this.join = this.join.bind(this);
  }
  
 
 
}

export { StudentEnrollment, VisitingScholars, StudyingAbroad}