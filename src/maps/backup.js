import React, { Component } from "react"
import $ from "jquery";
import '../styling/streamStack.css';

import * as d3 from '../../node_modules/d3/dist/d3.min.js';
class StreamStack extends Component {
  constructor() {
    super()
    this.state = {}
  }

   
  componentDidMount(){
  
var n = 10, // number of layers
m = 500, // number of samples per layer
k = 5; // number of bumps per layer

// Inspired by Lee Byron’s test data generator.
const bump = (a, n) => {
var x = 1 / (0.1 + Math.random()),
  y = 2 * Math.random() - 0.5,
  z = 10 / (0.1 + Math.random());
for (var i = 0; i < n; i++) {
var w = (i / n - y) * z;
a[i] += x * Math.exp(-w * w);
}
}

const bumps = (n, m) => {
var a = [], i;
for (i = 0; i < n; ++i) a[i] = 0;
for (i = 0; i < m; ++i) bump(a, n);
return a;
}

var colorrange = ['#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854','#ffd92f','#e5c494','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3','#b3b3b3'];



const stackMax = layer => d3.max(layer, d => d[1])
const stackMin = layer => d3.min(layer, d => d[0])



var stack = d3.stack().keys(d3.range(n)).offset(d3.stackOffsetWiggle),
layers0 = stack(d3.transpose(d3.range(n).map(() => bumps(m, k)))),
layers1 = stack(d3.transpose(d3.range(n).map(() => bumps(m, k)))),
layers = layers0.concat(layers1)
    
var svg = d3.select("#test"),
width = +svg.attr("width"),
height = +svg.attr("height")

var x = d3.scaleLinear()
.domain([0, m - 1])
.range([0, width])

var xAxis = d3.axisBottom()
    .ticks(d3.timeYears);

var y = d3.scaleLinear()
.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
.range([height, 0])

var area = d3.area()
.x((d, i) => x(i))
.y0(d => y(d[0]) - .2)
.y1(d => y(d[1]) +.2)


var z = d3.scaleOrdinal()
    .range(colorrange);

svg.selectAll("path")
.data(layers0)
.enter().append("path")
 .attr("d", area)
 .attr("fill", () => z(Math.random()))
    
 
  var collegeCode = {
      "Engineering" : "#66c2a5",
      "Science" : "#fc8d62",
      "Polytechnic" : "#8da0cb",
      "Management" : "#e78ac3",
      "Liberal Arts" : "#a6d854",
      "Agriculture" : "#ffd92f",
      "Pharmacy" : "#e5c494",
      "Others" : "#b3b3b3"
  }


  }
  render() {
    return (
        <div>
            <h2>International Students by college</h2>
            <div id="my-legend">
                <div className="row">
                    <div className="col-sm-3">
                        <svg height="20" width="20">
                            <circle cx="10" cy="10" r="5" stroke-width="3" fill="#66c2a5" />
                        </svg>
                        <div className = "legend-college">Engineering </div>
                    </div>
                    <div className="col-sm-3">
                        <svg height="20" width="20">
                            <circle cx="10" cy="10" r="5" stroke-width="3" fill="#fc8d62" />
                        </svg>
                        <div className = "legend-college">Science </div>
                    </div>
                    <div className="col-sm-3">
                    <svg height="20" width="20">
                        <circle cx="10" cy="10" r="5" stroke-width="3" fill="#8da0cb" />
                    </svg>
                    <div className = "legend-college">Polytechnic </div>
                    
                    </div>
                    <div className="col-sm-3">
                    <svg height="20" width="20">
                        <circle cx="10" cy="10" r="5" stroke-width="3" fill="#e78ac3" />
                    </svg>
                    <div className = "legend-college">Management </div>
                    
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                    <svg height="20" width="20">
                        <circle cx="10" cy="10" r="5" stroke-width="3" fill="#a6d854" />
                    </svg>
                    <div className = "legend-college">Liberal Arts </div>
                    
                    </div>
                    <div className="col-sm-3">
                    <svg height="20" width="20">
                        <circle cx="10" cy="10" r="5" stroke-width="3" fill="#ffd92f" />
                    </svg>
                    <div className = "legend-college">Agriculture </div>
                    
                    </div>
                    <div className="col-sm-3">
                    <svg height="20" width="20">
                        <circle cx="10" cy="10" r="5" stroke-width="3" fill="#e5c494" />
                    </svg>
                    <div className = "legend-college">Pharmacy </div>
                    
                    </div>
                    <div className="col-sm-3">
                    <svg height="20" width="20">
                        <circle cx="10" cy="10" r="5" stroke-width="3" fill="#b3b3b3" />
                    </svg>
                    <div className = "legend-college">Others </div>
                    
                    </div>
                </div>
            </div>
            <svg width="400" height="500" id = "test">  
            </svg>

            
        </div>
    )
  }
}

export default StreamStack