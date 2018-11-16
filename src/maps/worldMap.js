import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import Data from '../jsons/worldMap'

class WorldMap extends Component {
  constructor() {
    super()
    this.state = {
      worldData: feature(Data, Data.objects.countries).features,
    }
  }
  projection() {
    return geoMercator()
      .center([0, 5 ])
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
      .rotate([-180,0])

  }
//   componentDidMount() {
//     fetch("https://github.com/d3/d3.github.com/blob/master/world-110m.v1.json",{

//         mode: "no-cors", // no-cors,
//     })
//       .then(response => {
//         if (response.status !== 200) {
//           console.log(`There was a problem: ${response.status}`)
//           return
//         }
//         response.json().then(worldData => {
//           this.setState({
//             worldData: feature(worldData, worldData.objects.countries).features,
//           })
//           console.log(this.state.worldData);
//         })
//       })
//   }
  render() {
    return (
      <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
        <g className="countries">
          {
            this.state.worldData.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(this.projection())(d) }
                className="country"
                fill={ `rgba(38,50,56,${1 / this.state.worldData.length * i})` }
                stroke="#FFFFFF"
                strokeWidth={ 0.5 }
              />
            ))
          }
        </g>
        <g className="markers">
          <circle
            cx={ this.projection()([8,48])[0] }
            cy={ this.projection()([8,48])[1] }
            r={ 10 }
            fill="#E91E63"
            className="marker"
          />
        </g>
      </svg>
    )
  }
}

export default WorldMap