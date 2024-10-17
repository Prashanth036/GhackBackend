const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/userRoutes'); 
const scrapeWebtoons = require('./controllers/scraper');





const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.REACT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//ROUTES
app.use('/api', userRoutes);
app.use("/api/webtoons",scrapeWebtoons.scrapeWebtoons)
app.use("/api/webtoon_detail/:id",scrapeWebtoons.scarpToonDetails)





db.sequelize.authenticate()
  .then(() => db.sequelize.sync({force:false}))
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
