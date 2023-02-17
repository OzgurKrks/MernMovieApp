const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const authRoute = require("./routes/authRoute");
const movieRoute = require("./routes/movieRoute");
const connectDatabase = require("./confing/db");
const { errorHandler } = require("./middleware/errorHandler");
const cors = require("cors");

connectDatabase();
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/movie", movieRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
});
