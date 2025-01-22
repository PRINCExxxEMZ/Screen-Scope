import React, { useEffect, useRef, useState } from 'react';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa6';
import { FaRegStar } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";

const HomeCards = () => {
  const carouselRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [activeGenre, setActiveGenre] = useState(28); // Default to Action genre (id: 28)
  const [showAll, setShowAll] = useState(false); // Controls visibility of all cards

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
  };

  const genres = [
    { name: 'Action', id: 28 },
    { name: 'Biography', id: 36 },
    { name: 'Drama', id: 18 },
    { name: 'Series', id: 'series' }, // Special case for Series
    { name: 'Adventure', id: 12 },
    { name: 'Crime', id: 80 },
    { name: 'Comedy', id: 35 },
    { name: 'Documentary', id: 99 },
    { name: 'Animation', id: 16 },
  ];

  const fetchMovies = (genreId) => {
    const isSeries = genreId === 'series';
    const url = isSeries
      ? 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1'
      : `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmFkY2ExMzg2MThlMDkxODE4YzdlNzc0YzY3OTA0YyIsIm5iZiI6MTY5MzMwMDMxOC4xODIwMDAyLCJzdWIiOiI2NGVkYjY1ZWUyYmNhODAxMWMyNmIwZmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Y2o0kDHYm_nLcmmlkaXxV6PXSbiCJxK-P_-JLukGL9I',
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch movies.');
        return res.json();
      })
      .then((data) => {
        setMovies(data.results);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Please Check Your Internet Connection and Try Again.');
      });
  };

  useEffect(() => {
    setShowAll(false); // Reset to showing only 5 cards when genre changes
    fetchMovies(activeGenre);
  }, [activeGenre]);

  const visibleMovies = showAll ? movies : movies.slice(0, 5); // Show all or first 5 movies

  return (
    <div className="relative bg-[#000] m-10">
      <div className="mt-6">
        <h5 className="text-white ml-3 text-[22px]">Trends Now</h5>

        {/* Genre Carousel */}
        <div className="flex items-center justify-between p-3 mt-6">
          <FaLessThan
            size={28}
            className="text-[#76685B] cursor-pointer font-ubuntu"
            onClick={scrollLeft}
          />
          <div
            ref={carouselRef}
            className="flex gap-9 overflow-x-auto whitespace-nowrap scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
          >
            {genres.map((genre) => (
              <span
                key={genre.id}
                onClick={() => setActiveGenre(genre.id)}
                className={`text-[16px] font-ubuntu mt-3 px-2 rounded-[5px] cursor-pointer transition-all duration-500 ease-in-out ${
                    activeGenre === genre.id
                      ? 'bg-[#C4B4A5] text-[#000] px-4 py-2'
                      : 'text-[#76685B] hover:border-2 hover:border-[#C4B4A5] hover:px-4 hover:py-2'
                  }`}
                  
              >
                {genre.name}
              </span>
            ))}
          </div>
          <FaGreaterThan 

            size={28}
            className="text-[#76685B] cursor-pointer font-ubuntu"
            onClick={scrollRight}
          />
        </div>

        {/* Movies Display */}
        <div className="mt-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {visibleMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#141C29] w-[100%] h-[330px] p-4 rounded-lg shadow-lg flex flex-col items-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="rounded-lg w-[100vw] h-60 object-cover"
                />
                <div className="w-[100%] ">
                  <h3 className="text-sm font-ubuntu mt-2 text-white">
                    {movie.title || movie.name}
                  </h3>
                  <div className="w-[100%] flex items-center justify-between gap-[70px]">
                    <div className="flex items-center gap-1 mx-auto text-[12px] text-nowrap font-ubuntu mt-2 text-white">
                      {movie.release_date || movie.first_air_date}
                      <MdFavoriteBorder className="text-sm font-ubuntu text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRegStar className="text-sm font-ubuntu mt-2 text-[#FCE200]" />
                      <p className="text-sm font-ubuntu mt-2 text-white">
                        {movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button */}
          {!showAll && movies.length > 5 && (
            <div className="flex justify-end mt-7">
              <button
                onClick={() => setShowAll(true)}
                className=" flex items-center gap-2 text-[#C4B4A5] px-4 py-2  font-ubuntu hover:text-[#000] hover:bg-[#C4B4A5] hover:rounded-[10px] transition-all duration-300 ease-in-out "
              >
                See More
                <FaGreaterThan size={15}/>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
