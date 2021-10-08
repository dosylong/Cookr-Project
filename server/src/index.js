const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./routes');
const dotenv = require('dotenv');
dotenv.config();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(
  cors({
    origin: 'https://localhost:3000',
    credentials: true,
  })
);

app.use('/', (req, res) => {
  res.send('server is running');
});

route(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}!`);
});
