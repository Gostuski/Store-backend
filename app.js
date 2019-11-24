const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes');
const cors = require('cors');

app.use(cors());
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./middleware/logger'));

// Express session midleware

// Mongo connection link
const db = require('./db/dbURI').MongoURI;

// Mongo connect
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo db connected'))
  .catch(() => console.log('Error connecting to mongo db'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server starte on port : ${PORT}`));

app.use(router);
