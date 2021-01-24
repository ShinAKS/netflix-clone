import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = axios.get(requests.fetchNetflixOriginals);
      setMovie(
        (await request).data.results[
          Math.floor(Math.random() * (await request).data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  const truncateString = (string, maxLength = 50) => {
    if (!string) return null;
    if (string.length <= maxLength) return string;
    return `${string.substring(0, maxLength)}...`;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https:://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncateString(movie?.overview, 100)}
        </h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
