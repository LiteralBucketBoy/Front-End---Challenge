
import './App.css';
import {MoviesInfo} from "./movies/api-data/MoviesContext";
import {MovieList} from "./movies/movielist";
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <MoviesInfo/>
      </header>

          <MovieList className="App-MovieList"/>
    </div>
  );
}

export default App;
