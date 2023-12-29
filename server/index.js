const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const port = process.env.port || 8000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(userRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const url = String(process.env.MONGO_URI);
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });


app.listen(port, (err) => {
  if (err) {
    console.log("Some error occured");
    return;
  } 
  console.log(`Server running on port ${port}`);
});

