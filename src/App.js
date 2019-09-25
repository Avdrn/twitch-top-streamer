import React from 'react';
import {Route} from "react-router-dom";
import Streams from "./components/Streams"
import "./Stylesheets/App.css"


function App() {
  return (
    <div className="App">
        <Route exact path="/" component={Streams} /> 
    </div>
  );
}

export default App;
