import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../Assets/Logo.png";
import { MdOutlineSearch } from "react-icons/md";
import { FaSearch, FaTimes } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import './PagesOfHeaders/header.css'
import axios from "axios";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  // Toggle search input visibility
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`,{
     params : {
      api_key : 'f2adca138618e091818c7e774c67904c',
      query : search
     }
      });
       //navigate(`/search`, { state: {response.data.results } });
      console.log(response.data.results)
       setSearchResult(response.data.results)
       
    } catch (error) {
      console.error('Error fetching search results:', error);
    }

    setSearch('')
    

    
    // Implement your search logic here
  };

  // Toggle mobile navigation menu
  const handleNav = () => {
    setOpen(!open);
  };

  return (
    <header className="relative">
      {/* Main Header Section */}
      <div className="w-full h-full object-contain">
      <div className="bg-black  flex justify-between items-center p-5 w-full">
        {/* Logo */}
        <div className="w-[150px] ml-7 ">
          <img src={logo} alt="LOGO" className="h-auto md:w-[250px]" />
        </div>

        {/* Desktop Navigation Links and  other Actions */}
        <div className="hidden sm:flex items-center gap-6 mr-14">
          {/* Navigation Links */}
          <ul className="flex items-center gap-4 font-medium text-base">
            {["Home", "Movies", "Series", "Games", "Anime"].map((item) => (
              <li
                key={item}
                className=''
              >
                <NavLink
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    isActive
                   ? "border-b-2 border-custom-border text-white" 
                   : "border-b-2 border-transparent hover:border-custom-border text-[#8E8E93] hover:text-white"
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Search Icon and Input */}
          <div className="relative text-[#C4B4A5] cursor-pointer">
            <MdOutlineSearch size={24} onClick={handleShowSearch} />
            {showSearch && (
              <form
                onSubmit={handleSearch}
                className="absolute top-[40px] left-0  flex items-center   rounded-full p-0  shadow-md"
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-black rounded-full border border-custom-border bg-white px-4 py-2 flex-grow"
                  placeholder="Search movies"
                />
                <button type="submit" className="">
                  <FaSearch className="text-black ml-[-25px]" />
                </button>
              </form>
            )}
          </div>

          {/* Sign-in and Sign-up Links */}
          <div className="flex items-center text-sm gap-4">
            <Link to="/">
              <h4 className="border border-custom-border px-3 text-[#C4B4A5] cursor-pointer py-1">
                Sign-in
              </h4>
            </Link>
            <Link to="/">
              <h4 className="bg-[#C4B4A5] text-black px-3 py-1 cursor-pointer">
                Sign-up
              </h4>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div
          className="block sm:hidden text-[#C4B4A5] cursor-pointer z-50 fixed top-5 right-5"
          onClick={handleNav}
        >
          {open ? <FaTimes size={30} /> : <RxHamburgerMenu size={30} className="" />}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
         <div
         className="sm:hidden fixed top-0 h-screen left-0 right-0 bg-black text-[#C4B4A5] p-5 flex flex-col gap-4 z-40 transition-all duration-[9000ms] ease-in-out bg-opacity-80 backdrop-blur-lg transform -translate-y-full"
         style={{ transform: open ? 'translateY(0)' : 'translateY(-100%)' }}
       >
                    <div className="absolute text-[#C4B4A5] cursor-pointer right-[100px] top-[-45px]">
            <MdOutlineSearch size={24} onClick={handleShowSearch} />
            {showSearch && (
              <form
                onSubmit={handleSearch}
                className="absolute top-[40px] right-[-97px]  flex items-center   rounded-full p-0  shadow-md"
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-black rounded-full border border-custom-border bg-white px-4 py-2 flex-grow"
                  placeholder="Search movies"
                />
                <button type="submit" className="">
                  <FaSearch className="text-black ml-[-25px]" />
                </button>
              </form>
            )}
          </div>
          {["Home", "Movies", "Series", "Games", "Anime"].map((item) => (
            <Link key={item} to={item === "Home" ? "/" :`/${item.toLowerCase()}`} onClick={handleNav}>
              {item}
            </Link>
          ))}
              {/* Sign-in and Sign-up Links inside the mobile menu */}
              <div className="flex flex-col gap-2  ">
            <Link to="/" onClick={handleNav} className="text-[#717171]">
              <h4 className="border border-custom-border px-3 py-2 text-center">
                Sign-in
              </h4>
            </Link>
            <Link to="/" onClick={handleNav} className="text-black">
              <h4 className="bg-[#C4B4A5] text-center px-3 py-2">Sign-up</h4>
            </Link>
          </div>
        </div>
      )}
      </div>
      {/* To Display the search results */}

{/* To Display the search results */}
{/* To Display the search results */}
{/* To Display the search results */}
{/* To Display the search results */}
{searchResult && searchResult.length > 0 && (
  <div className="absolute top-[90px] grid grid-cols-6 gap-4 w-full">
    {searchResult.map((movie, index) => (
      <div
        key={index}
        className="relative min-h-screen w-full bg-cover bg-center text-white"
        style={{
          backgroundImage: movie.poster_path
            ? `url(https://image.tmdb.org/t/p/original${movie.poster_path})`
            : 'none', // Fallback in case poster_path is null or undefined
        }}
      >
        {movie.poster_path ? (
          <Link to={`/movie/${movie.id}`} onClick={() => setShowSearch(false)}>
            <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 w-full">
              <h4 className="text-lg">{movie.title}</h4>
              <p>{movie.release_date}</p>
            </div>
          </Link>
        ) : (
          <p className="p-4 text-center text-white">No Image Available</p>
        )}
      </div>
    ))}
  </div>
)}



    </header>
  );
};

export default Header;
