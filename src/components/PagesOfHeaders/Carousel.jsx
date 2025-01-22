import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import '../PagesOfHeaders/customCarousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const desiredMovies = ['The Batman', 'Batman Begins', 'Spider-Man: No Way Home', 'Captain Marvel', 'Thor','Superman' ];

    const fetchData = async (title) => {
      try {
        const searchResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=f2adca138618e091818c7e774c67904c&query=${title}`
        );
        const movieId = searchResponse.data.results[0].id;
    
        const detailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=f2adca138618e091818c7e774c67904c`
        );
        return detailsResponse.data;

        console.log(detailsResponse.data)
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
        return null;
      }
    };
    

    const fetchAllData = async () => {
      const movies = await Promise.all(
        desiredMovies.map(async (title) => await fetchData(title))
      );
      console.log(setCarouselData)
      setCarouselData(movies);
    };

    fetchAllData();
  }, []);

  // Carousel Settings
  const settings = {

    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="relative bg-black h-screen overflow-hidden w-full object-cover">
      <div className="w-full h-full">
        {carouselData.length > 0 ? (
          <Slider {...settings}>
            {carouselData.map((item, index) => (
              <div key={index} className="relative h-screen">
                <img
                      src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                      alt={item.title}
          
                  className=" w-full object-cover  h-full" // Ensures the image covers the full width and height
                />
                <div className="absolute top-[15%]  text-[#C4B4A5] z-5 left-0 w-full h-[40%] flex flex-col justify-start items-start p-3 font-custom max-w-2xl ">
                  <h3 className=" text-[#fff] text-[60px] mb-2 font-bold">
                    {item.title.toUpperCase()}
                  </h3>
                  <div className="text-white flex gap-1 mt-4  ">
                  <p className='border-r-[1px] p-1'><strong></strong> {item.genres.map(genre => genre.name).join(', ')}</p>
                  <p className='border-r-[1px] p-1'><strong></strong> {new Date(item.release_date).getFullYear()}</p>
                  <p className='border-r-[1px] p-1'><strong></strong> {item.runtime} minutes</p>
                  <p className=' bg-[#C4B4A5] w-[40px] flex items-center justify-center p-1'><strong></strong> {item.adult ? 'Adults Only' : '18+'}</p>
                </div>
                  <p className="text-white text-lg max-w-2xl mt-6 text-wrap">
                    {item.overview}
                  </p>
              
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Carousel;
