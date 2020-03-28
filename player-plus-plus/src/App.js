import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import HomePage from './components/home-page.component';
import TestPage from './components/test.component';
import Navbar from './components/navbar.component';

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
    <Route path="/" component={Navbar} />
    <Route path="/homepage" component={HomePage} />
    <Route path="/testpage" component={TestPage} />
    </Router>
  );
}

export default App;
