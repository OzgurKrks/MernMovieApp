const router = require("express").Router();
const asynHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware");

const Movie = require("../models/movieModel");

router.get(
  "/getAllMovies",
  protect,
  asynHandler(async (req, res) => {
    const movies = await Movie.find({ user: req.user.id });

    res.status(200).json(movies);
  })
);
router.post(
  "/addMovie",
  protect,
  asynHandler(async (req, res) => {
    const { movieTitle } = req.body;
    const checkMovie = await Movie.findOne({ movieTitle });
    if (checkMovie) {
      res.status(500).json({
        message: "the movie already exists",
      });
    }
    const movie = await Movie.create({
      movieTitle: req.body.movieTitle,
      movieImage: req.body.movieImage,
      movieRunTime: req.body.movieRunTime,
      vote: req.body.vote,
      user: req.user.id,
    });
    res.status(200).json(movie);
  })
);
router.delete(
  "/deleteMovie/:id",
  protect,
  asynHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      res.status(400);
      throw new Error("movie not found");
    }
    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }
    // Make sure the logged in user matches the goal user
    if (movie.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await movie.remove();

    res.status(200).json({ id: req.params.id });
  })
);
module.exports = router;
