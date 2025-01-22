import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../Assets/Logo.png";
import { MdOutlineSearch } from "react-icons/md";
import { FaSearch, FaTimes } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import "./PagesOfHeaders/header.css";
import axios from "axios";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: "f2adca138618e091818c7e774c67904c",
            query: search,
          },
        }
      );
      setSearchResult(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setSearch("");
  };

  const handleNav = () => {
    setOpen(!open);
  };

  return (
    <header className="bg-[#000]">
      <div className="sticky top-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
        <div className="flex justify-between items-center p-4">
          {/* Logo */}
          <div className="w-[150px] ml-7">
            <img src={logo} alt="LOGO" className="h-auto md:w-[250px]" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-6 mr-14">
            <ul className="flex items-center gap-4 font-medium text-base">
              {["Home", "Movies", "Series", "Games", "Animation"].map((item) => (
                <li key={item}>
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

            {/* Search */}
            <div className="relative text-[#C4B4A5] cursor-pointer">
              <MdOutlineSearch size={24} onClick={handleShowSearch} />
              {showSearch && (
                <form
                  onSubmit={handleSearch}
                  className="absolute top-[40px] left-0 flex items-center rounded-full shadow-md bg-white"
                >
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="text-black rounded-full border px-4 py-2"
                    placeholder="Search movies"
                  />
                  <button type="submit" className="">
                    <FaSearch className="text-black ml-[-25px]" />
                  </button>
                </form>
              )}
            </div>

            {/* Sign-in and Sign-up */}
            <div className="flex items-center text-sm gap-9">
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

          {/* Mobile Menu Toggle */}
          <div
            className="block sm:hidden text-[#C4B4A5] cursor-pointer z-50"
            onClick={handleNav}
          >
            {open ? <FaTimes size={30} /> : <RxHamburgerMenu size={30} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed top-0 left-0 right-0 bg-black text-[#C4B4A5] p-5 flex flex-col gap-4 z-40 bg-opacity-80 backdrop-blur-lg">
          {["Home", "Movies", "Series", "Games", "Animation"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={handleNav}
            >
              {item}
            </Link>
          ))}
          <div className="flex flex-col gap-2">
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
    </header>
  );
};

export default Header;
