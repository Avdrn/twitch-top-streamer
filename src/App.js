import React from 'react';
import logo from './logo.svg';
import './Stylesheets/App.css';
import {Route, Switch} from "react-router-dom";
import Streams from "./components/Streams"
import Game from "./components/Game"


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Streams} /> 
        <Route path="/game/:id" component={Game} /> 
      </Switch>

    </div>
  );
}

export default App;
