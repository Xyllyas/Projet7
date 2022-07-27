const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const helmet = require("helmet");


require('dotenv').config()

mongoose.connect(process.env.SECRET_DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
 
  app.use(cors());
  app.use(helmet({crossOriginResourcePolicy : { policy: "cross-origin" }}));
  app.use(bodyParser.json());
  app.use(express.json());

  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/auth', userRoutes);
  app.use('/api', postRoutes);
  app.use('/api', commentRoutes);

  module.exports = app

