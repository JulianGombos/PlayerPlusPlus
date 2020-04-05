import React, { Component } from 'react';
import "./style-sheets/home-page.css";

import NavBar from "./navbar.component";

export default class MinecraftPage extends Component{
  constructor(props) {
    super(props);

  }

  render(){
    return(
      <NavBar />
    );
  }
} 