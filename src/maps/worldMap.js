import React, { Component } from "react"
import Iframe from 'react-iframe'
import { StudentEnrollment,  StudyingAbroad} from './baseMap'
import VisitingScholars from "./faculty"
import "../styling/home.css";
import StreamStack from './stream.js';

class WorldMap extends Component {
  constructor() {
    super()
    this.state = {
    }
    }
  
  componentDidMount() {   

 
  }

  render() {
    return (
      <div>
      
      <div className = "row">
       <div className = "col-2"></div>
      <div className = "col-8">

        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Student Enrollment</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Visiting Scholars</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Studying Abroad</a>
          </li>
        </ul>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
       
        <StudentEnrollment/>
        <StreamStack/>
        <Iframe url="http://localhost:8000/maps/test.html"
            position="absolute"
            width="100%"
            overflow = "scroll"
            id="chart"
            className="chart"
            height="100%"
            styles={{height: "500px"}}
            />
        
        </div>
        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <VisitingScholars/>
        </div>
        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
        <StudyingAbroad/>
        </div>
      </div>
      </div>
      <div className = "col-2"></div>
      </div>
      
      </div>
    )
  }
}

export default WorldMap