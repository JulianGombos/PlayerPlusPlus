import React, { Component } from 'react';
import "./style-sheets/navbar.css";

import NavBar from "./navbar.component";

export default class MinecraftPage extends Component{
  constructor(props) {
    super(props);

  }

  render(){
    return(
      <div>
        <NavBar />
      </div>
    );
  }
} 