const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movieId: {
    type: String,
  },
  movieTitle: {
    type: String,
  },
  movieImage: {
    type: String,
  },
  movieRunTime: {
    type: String,
  },
  vote: {
    type: String,
  },
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
