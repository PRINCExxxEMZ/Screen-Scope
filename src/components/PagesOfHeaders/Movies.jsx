import React, { useState, useEffect } from "react";

const Movies = () => {
  const [input, setInput] = useState(""); // Manage input separately
  const [movies, setMovies] = useState([]); // This stores movie data

  // Fetch popular series when the component mounts
  useEffect(() => {
    fetchPopularSeries(); // Fetch popular series on mount
  }, []);

  const fetchPopularSeries = (query) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmFkY2ExMzg2MThlMDkxODE4YzdlNzc0YzY3OTA0YyIsIm5iZiI6MTcyODkwMDU2MC44NDEzOTYsInN1YiI6IjY0ZWRiNjVlZTJiY2E4MDExYzI2YjBmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._D8tBHtUoaHvbpyOjBXoeXXbroOtytF8CovHTfTRxLY",
      },
    };

    const searchQuery = query || "popular"; // Use input for search or fetch popular series
    const url =
      searchQuery === "popular"
        ? "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
        : `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results || []); // Ensure it's an array
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      fetchPopularSeries(input); // Use input value to search
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input} // Controlled input for search
          placeholder="Enter a movie"
          onChange={(e) => setInput(e.target.value)} // Update input value only
          className="border p-2 rounded mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>

      {/* Render the series results here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="bg-white p-4 shadow-md rounded-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.original_name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2">
                {movie.original_name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{movie.overview}</p>
            </div>
          ))
        ) : (
          <p>Please search properly</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
