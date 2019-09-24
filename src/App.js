import React from 'react';
import {Route} from "react-router-dom";
import Streams from "./components/Streams"


function App() {
  return (
    <div>
        <Route exact path="/" component={Streams} /> 
    </div>
  );
}

export default App;
