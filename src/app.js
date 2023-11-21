const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products.router");
const ordersRouter = require("./routes/orders.router");
const cartsRouter = require("./routes/carts.router");
const multer = require("multer");

const app = express();

//Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

//Load multer
const upload = multer({ storage:storage });

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
app.use("/api/orders", ordersRouter);
app.use("/api/carts", cartsRouter);

// Access the images folder
app.use('/api/images', express.static(__dirname + '/images'));

//Multer handler for uploading file
app.post("/api/upload", upload.single("Uploadfile"), (req, res, next) => {
  res.json({ file: req.file});
})

// Handle 404 response
app.use(resourceNotFound);
// Define error-handling middleware last
app.use(handleError);

module.exports = app;
