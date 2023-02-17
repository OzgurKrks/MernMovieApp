import axios from "axios";
import ScrollButton from "../components/ScrollAnimation/ScrollButton";
import { useEffect, useState } from "react";
import Movies from "../components/Movies";

import HeaderImage from "../components/HeaderImage";
function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=c65ec8ffaebe1ee7034995facb92c678&language=en-US&page=1`;
    fetchData(endpoint);
  }, []);
  const fetchData = async (path) => {
    const response = await axios.get(path);

    setMovies([...movies, ...response.data.results]);
    setPage(response.data.page);
  };
  onclick = () => {
    setPage(page + 1);
    const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=c65ec8ffaebe1ee7034995facb92c678&language=en-US&page=${page}`;
    fetchData(endpoint);
  };

  return (
    <div>
      <HeaderImage />
      <div className='w-full px-5 my-5 '>
        <h1 className='text-2xl'>Movies</h1>
      </div>
      <div className='w-full px-5 h-auto grid grid-cols-1 md:grid-cols-4 gap-5'>
        {movies ? movies.map((m) => <Movies m={m} />) : <h1>Loading...</h1>}
      </div>
      <div className='w-full flex justify-center my-5 hover:opacity-90'>
        {movies ? (
          <button
            className='w-[120px] h-[35px] rounded-md bg-blue-600'
            onClick={onclick}
          >
            load More
          </button>
        ) : (
          ""
        )}
      </div>
      <ScrollButton />
    </div>
  );
}

export default Dashboard;
