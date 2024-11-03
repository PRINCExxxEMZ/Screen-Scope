import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";  // Adjust the import path based on your file structure
import Home from "./components/PagesOfHeaders/Home";  // The home component
import Anime from "./components/PagesOfHeaders/Anime";
import Games from "./components/PagesOfHeaders/Games";
import Series from "./components/PagesOfHeaders/Series";
import Movies from "./components/PagesOfHeaders/Movies";

const App = () => {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div>
      <Router>
        {/* Header component */}
        <Header setSearchResult={setSearchResult} />

        {/* Routes for the application */}
        <Routes>
          <Route
            path="/"
            element={<Home searchResult={searchResult} />} // Pass the search results to the Home component
          />
          <Route path="/anime" element={<Anime />} />
          <Route path="/games" element={<Games />} />
          <Route path="/series" element={<Series />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
