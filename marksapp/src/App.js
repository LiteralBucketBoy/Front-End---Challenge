
import './App.css';
import {MoviesInfo} from "./movies/api-data/MoviesContext";
import {MovieList} from "./movies/movielist";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <MoviesInfo/>
      </header>
          <MovieList className="movieList"/>
    </div>
  );
}

export default App;
