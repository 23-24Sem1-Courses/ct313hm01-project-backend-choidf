const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products.router");
const app = express();

const {
  resourceNotFound,
  handleError,
} = require("./controllers/errors.controller");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to goodie application." });
});

app.use("/api/products", productsRouter);

// Handle 404 response
app.use(resourceNotFound);
// Define error-handling middleware last
app.use(handleError);

module.exports = app;
