const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');

const staticMiddleware = express.static(path.join(__dirname, 'dist'));
app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);

app.use(cors());
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

const PORT = 5000;

app.listen(PORT, console.log(`Server starte on port : ${PORT}`));

app.use(router);
