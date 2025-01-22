// import React, { useState } from 'react';

// const TrendAct = () => {
//   const [movies, setMovies] = useState([]); // State to store fetched movies
//   const [error, setError] = useState(null); // State to handle errors

//   const fetchActionMovies = () => {
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization:
//           'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmFkY2ExMzg2MThlMDkxODE4YzdlNzc0YzY3OTA0YyIsIm5iZiI6MTY5MzMwMDMxOC4xODIwMDAyLCJzdWIiOiI2NGVkYjY1ZWUyYmNhODAxMWMyNmIwZmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Y2o0kDHYm_nLcmmlkaXxV6PXSbiCJxK-P_-JLukGL9I',
//       },
//     };

//     fetch('https://api.themoviedb.org/3/discover/movie?with_genres=28&language=en-US', options)
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch movies.');
//         return res.json();
//       })
//       .then((data) => {
//         setMovies(data.results); // Update movies state
//         setError(null); // Clear any previous errors
//       })
//       .catch((err) => {
//         console.error(err);
//         setError('Failed to fetch movies. Please try again.');
//       });
//   };

//   return (
//     <div className="text-white">
//       {/* Action Button */}
//       <button
//         onClick={fetchActionMovies}
//         className="text-[#76685B] text-[20px] font-ubuntu px-2 bg-[#C4B4A5] rounded-[5px] hover:bg-[#76685B] hover:text-[#000] cursor-pointer"
//       >
//         Action
//       </button>

//       {/* Error Message */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {/* Movies List */}
//       <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {movies.map((movie) => (
//           <div
//             key={movie.id}
//             className="bg-[#1c1c1c] p-4 rounded-lg shadow-lg flex flex-col items-center"
//           >
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="rounded-lg w-full h-60 object-cover"
//             />
//             <h3 className="text-lg font-ubuntu mt-2">{movie.title}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrendAct;
