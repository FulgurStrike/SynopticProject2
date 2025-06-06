const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const flash = require('connect-flash')

const cropPageRoutes = require('./routes/CropPageRoutes');
const cropRecommendationRoutes = require('./routes/CropRecommendationRoutes');
const indexRoutes = require('./routes/IndexRoutes');
const farmingRoutes = require('./routes/farmingRoutes');
const shopRoutes = require('./routes/ShopRoutes');
const weatherRoutes = require('./routes/weatherPageRoutes');
const listingRoutes = require('./routes/ListingRoutes');
const loginRoutes = require('./routes/LoginRoutes');
const signupRoutes = require('./routes/SignupRoutes');

const connectDB = require('./config/database');
dotenv.config(); // Load environment variables from .env

class App {
  constructor() {
    this.jsonParser = bodyParser.json;


    this.PORT = process.env.PORT || 3000;
    this.app = express();
  }

  async startServer() {

    this.app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    }));

    this.app.use(flash());

    this.app.use((req, res, next) => {
      res.locals.errorMessages   = req.flash('error') || [];
      res.locals.successMessages = req.flash('success') || [];
      next();
    });

    this.app.set('view engine', 'ejs');
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(cookieParser());

    // Passes the login status to the views
    this.app.use((req, res, next) => {
      const driverToken = req.cookies.driver_token;
      const adminToken = req.cookies.adminToken // Check for JWT Token
      res.locals.isLoggedIn = driverToken || adminToken ? true : false;
      next();
    });

    // MongoDB connection
    await connectDB();

    // Middleware to authenticate JWT token (for protected routes)
    this.app.use((req, res, next) => {
      const token = req.cookies.auth_token; // Accessing JWT token from cookie
      if (token) {
        jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
          if (err) {
            return res.status(403).send('Forbidden');
          }
          req.user = user; // Attach user data to request
          next();
        });
      } else {
        next(); // Continue even if there's no token
      }
    });
    
    // routes
    this.app.use(cropPageRoutes);
    this.app.use(cropRecommendationRoutes);
    this.app.use(indexRoutes);
    this.app.use(farmingRoutes);
    this.app.use(shopRoutes);
    this.app.use(weatherRoutes);
    this.app.use(listingRoutes);
    this.app.use(signupRoutes);
    this.app.use(loginRoutes);

    this.app.listen(this.PORT, () => {
      console.log(`Now listening on port ${this.PORT}`);
      console.log(`http://localhost:${this.PORT}`);
    });

  }   
}

let app = new App();
app.startServer();
