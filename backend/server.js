const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bookRoutes = require("./routes/books");
const countRoutes = require("./routes/count");
const userRoutes = require("./routes/users");

//express app
const app = express();


//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/books", bookRoutes);
app.use("", countRoutes)
app.use("/api/users", userRoutes)


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

