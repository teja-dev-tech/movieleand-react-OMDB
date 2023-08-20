import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";
import dotenv from "dotenv";
dotenv.config();
const API_URL =
  "https://www.omdbapi.com/?i=tt3896198&apikey=" +
  process.env.REACT_APP_API_KEY;

console.log(process.env.REACT_APP_API_KEY);
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let len=0;
  if(movies){
    len=movies.length;
  }

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = response.json();
    console.log(data);
    data.then((res) => {
      setMovies(res.Search);
    });
  };

  useEffect(() => {
    searchMovies("avengers");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              searchMovies(searchTerm);
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="SearchIcon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {len > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
