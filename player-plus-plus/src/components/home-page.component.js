import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import "./style-sheets/home-page.css";

export default class HomePage extends Component{

  render(){
    return(
      <body>
          <div class = "pageBackground">
              <div class = "topBar">
                  <div class = "topBarGrid">
                      <div class = "circle"></div>
                      <div><a href="home.html" target="_blank" class="websiteNameButton" >Website Name</a></div>
                      <div><a href="testPage.html" target="_blank" class="allGamesButton" >All Games</a></div>
                  </div>
              </div>
              <div class = "leftBar"></div>
          </div>
      </body>
    );
  }
} 