
import './App.css';
import {MoviesInfo} from "./movies/api-data/MoviesContext";
import {MovieList} from "./movies/movielist";
import React from "react";

function App() {
  return (

    <div className="App">
      <header className="App-header">
          <MoviesInfo/>
          <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'/>
      </header>

          <MovieList className="App-MovieList"/>
    </div>
  );
}

export default App;
