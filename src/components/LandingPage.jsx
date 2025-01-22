import React, { useState } from "react";
import Header from "../components/Header"; // Import your Header component

const LandingPage = () => {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div>
      {/* Header Component */}
      <Header setSearchResult={setSearchResult} />

      {/* Main Landing Content */}
      <section>
        {/* Add your main landing page content here */}
        <div className="py-8 text-center">
          <h1 className="text-4xl text-white">Welcome to Movie Finder!</h1>
          <p className="text-lg text-gray-300">Discover the best movies, series, and more...</p>
        </div>
      </section>

      {/* Search Results Section */}
      {searchResult.length > 0 && (
        <section className="search-results py-8">
          <h2 className="text-white text-center mb-6">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResult.map((movie, index) => (
              <div
                key={index}
                className="relative bg-cover bg-center text-white"
                style={{
                  backgroundImage: movie.poster_path
                    ? `url(https://image.tmdb.org/t/p/original${movie.poster_path})`
                    : 'none',
                }}
              >
                {movie.poster_path ? (
                  <div>
                    <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 w-full">
                      <h4 className="text-lg">{movie.title}</h4>
                      <p>{movie.release_date}</p>
                    </div>
                  </div>
                ) : (
                  <p className="p-4 text-center">No Image Available</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default LandingPage;
