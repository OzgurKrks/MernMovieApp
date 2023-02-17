import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailImage from "./DetailImage";
import Cast from "./Cast";

function MovieDetails() {
  let { movieId } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=c65ec8ffaebe1ee7034995facb92c678&language=en-US&page=1`
      );
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <DetailImage data={data} />

      <Cast movieId={movieId} />
    </div>
  );
}

export default MovieDetails;
