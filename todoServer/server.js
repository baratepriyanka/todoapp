
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("./db/conn");
const webRouter = require('./routes/todo');
const app = express();
const port = 8085;

app.use(cors());

app.use(bodyParser.json());

app.use("/todo", webRouter);

app.listen(port, () => {
    // console.log("djhgjdfgkjdfhgdjfhgdfj")
    // console.log("djhgjdfgkjdfj")
  console.log(`Server running on port ${port}`);
});