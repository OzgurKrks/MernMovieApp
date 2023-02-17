const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      res.status(500).json({
        message: "User has already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(200).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  })
);
router.get(
  "/getme",
  protect,
  asyncHandler(async (req, res) => {
    res.status(200).json({
      message: "success",
    });
  })
);
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

router.get(
  "/getme",
  protect,
  asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
  })
);
module.exports = router;
