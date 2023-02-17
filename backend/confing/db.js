const mongoose = require("mongoose");

const connectDatabase = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URI, () =>
      console.log("DataBase connecting succesful")
    );
  } catch (error) {
    throw new Error("somethink is wrong for connecting");
  }
};
module.exports = connectDatabase;
