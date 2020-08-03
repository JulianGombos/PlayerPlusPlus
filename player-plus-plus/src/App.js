import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import HomePage from './components/home-page.component';
//import AllGames from './components/all-games';
import Navbar from './components/navbar.component';
import GamePage from './components/game-page.component';

/*
function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}
*/

function App(){
  return (
    <Router>
    <Route path="/" component={HomePage} />
    {/* <Route path="/homepage" component={HomePage} /> */}
    {/* <Route path="/allgames" component={AllGames} /> */}
    <Route path="/game" component={GamePage} />
    </Router>
  );
}

export default App;
