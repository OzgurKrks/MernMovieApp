import React, { useEffect, useState } from "react";
import axios from "axios";
import { Descriptions } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createFavorite } from "../features/favoriteSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
function DetailImage({ data }) {
  const [movies, setMovies] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      const confing = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        process.env.REACT_APP_URL + "/movie/getAllMovies",
        confing
      );
      const data = response.data;
      setMovies(data);
    };
    fetchData();
  }, [user, movies]);
  const onClick = () => {
    if (user) {
      let b = movies.filter((m) => m.movieTitle.includes(data.title));
      if (b.length > 0) {
        return toast.error("the movie already exists");
      }
      dispatch(
        createFavorite({
          movieImage: data.backdrop_path,
          movieTitle: data.title,
          movieRunTime: data.runtime,
          vote: data.vote_average,
        })
      );

      toast.success("successful");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className='w-full h-[480px] flex justify-center  relative  '>
        <img
          className='w-[90%]  object-fill '
          src={"https://image.tmdb.org/t/p/original" + data.backdrop_path}
          alt='/'
        ></img>
        <div className='absolute bottom-10  w-[70%]'>
          <h3 className='text-2xl text-white'>{data.title}</h3>
          <p className='text-xl text-white '>{data.overview}</p>
        </div>
      </div>
      <div className='w-[95%] flex items-center justify-end h-auto my-5'>
        <button
          className='bg-blue-600 w-auto p-1 h-10 rounded-md text-white'
          onClick={onClick}
        >
          + add to favorites
        </button>
      </div>
      <div className='w-full flex justify-center '>
        <Descriptions
          className='bg-slate-200 h-70 w-[1440px]'
          title='Movie Info'
          bordered
        >
          <Descriptions.Item label='Title'>
            {data.original_title}
          </Descriptions.Item>
          <Descriptions.Item label='Release Date'>
            {data.release_date}
          </Descriptions.Item>
          <Descriptions.Item label='Reveue'>{data.reveue}</Descriptions.Item>
          <Descriptions.Item label='Run Time'>{data.runtime}</Descriptions.Item>
          <Descriptions.Item label='Vote Average' span={2}>
            {data.vote_average}
          </Descriptions.Item>
          <Descriptions.Item label='Vote Count'>
            {data.vote_count}
          </Descriptions.Item>
          <Descriptions.Item label='Status'>{data.status}</Descriptions.Item>
          <Descriptions.Item label='Popularity'>
            {data.popularity}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
}

export default DetailImage;
