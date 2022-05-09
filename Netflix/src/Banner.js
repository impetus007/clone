import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "./request";
function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  return (
    <header>
      {/* {title} */}
      {/* {div 2 buttons} */}
      {/* {descriptions} */}
    </header>
  );
}

export default Banner;
