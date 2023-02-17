import { useState } from "react";
import axios from "axios";

function Cast({ movieId }) {
  const [data, setData] = useState([]);
  const [castLoad, setCastLoad] = useState(true);
  const onClick = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c65ec8ffaebe1ee7034995facb92c678&language=en-US&page=1`
    );
    setData(response.data.cast);
    setCastLoad(!castLoad);
  };

  return (
    <div>
      {castLoad && (
        <div className='w-full flex justify-center  items-center my-5'>
          <button
            className=' w-[91%] bg-blue-600 h-10   hover:bg-blue-500 '
            onClick={onClick}
          >
            <p className='text-white text-xl font-semibold '>load cast</p>
          </button>
        </div>
      )}
      <div className='grid grid-cols-4 gap-10 my-5'>
        {data
          ? data.map((m) => (
              <img
                key={m.id}
                className='object-cover rounded-lg w-[350px] hover:opacity-60 transition-all'
                src={"https://image.tmdb.org/t/p/original" + m.profile_path}
                alt={m.title}
              />
            ))
          : ""}
      </div>
    </div>
  );
}

export default Cast;
