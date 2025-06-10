const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
require('dotenv').config();

if (!process.env.JWT_TOKEN) {
    console.error("JWT_TOKEN is not defined in .env");
    process.exit(1);
}

const loginContent = {
  title: "Login",
  formHeaderText: "Log In",
  email: "Email",
  password: "Password",
  loginButton: "Log In",
  dontHaveAccount: "Don't have an account?",
  signUpLinkText: "Sign Up",
  invalidCredentials: ""
}

// Login to account
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
       req.flash('error', 'Email and password are required');
       req.flash('formData', req.body);
       return res.redirect('/login'); 
    }

    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (user === null) {
            req.flash('error', 'Incorrect email or password');
            req.flash('formData', req.body);
            return res.redirect('/login');
        } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'Incorrect email or password');
            req.flash('formData', req.body);
            return res.redirect('/login');
        }
        // Create JWT token with user info
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: '5h' });       
        
        // Set JWT token into cookie
        const userID = user._id.toString();
        console.log(userID);
        res.cookie('user_token', token, {httpOnly: true, maxAge: 5 * 60 * 60 * 1000});
        
        res.cookie('user_id', userID);

        return res.redirect('/');
    }
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong, please try again')
        return res.redirect('/login');
    }
};


// Logout user
exports.logout = (req, res) => {
    res.clearCookie('user_token', {path: '/'});
    res.clearCookie('user_id', { path: '/' });
    res.redirect('/login');
};

// Middleware to authenticate JWT token
exports.authenticateUser = (req, res, next) => {
    const token = req.cookies.user_token;
    if (!token) {
        res.clearCookie('user_token');
        res.clearCookie('user_id');
        return res.redirect('/login');
    } 

    jwt.verify(token, process.env.JWT_TOKEN, async (err, decoded) => {
        if (err) {
            res.clearCookie('user_token');
            res.clearCookie('user_id');
            req.flash('error', 'Session expired, please log in again');
            return res.redirect('/login');
        }

        try {
            const user = await User.findById(decoded.userId);
            if (!user) {
                throw new Error('User not found');
            }
            req.user = user;
            next();
        } catch (err) {
            console.log(err);
            res.clearCookie('user_token');
            res.clearCookie('user_id');
            return res.redirect('/login');
        }
    });
};

exports.renderLoginPage = (req, res) => {
    return res.render('loginPage', {
        ...loginContent,
        formData: req.flash('formData')[0] || {}
    })
};