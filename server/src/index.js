const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", (req, res) => {
  res.send("hello");
});

app.use(express.json());

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}!`);
});
