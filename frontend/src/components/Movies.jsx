import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
function Movies({ m }) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div
      onClick={() => navigate(`/movies/${m.id}`)}
      key={m.id}
      className='w-auto h-auto hover:translate-x-2 shadow-[0_35px_60px_-15px_rgba(0,0,0.9,0.3)] cursor-pointer'
    >
      <img
        data-aos='fade-right'
        className='object-cover rounded-lg h-[300px]'
        src={"https://image.tmdb.org/t/p/original" + m.backdrop_path}
        alt={m.title}
      />
    </div>
  );
}

export default Movies;
