const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bookRoutes = require("./routes/books");

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

