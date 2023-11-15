require("dotenv").config();
const app = require("./src/app");

//start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Goodie server is running on port ${PORT}.`);
});
