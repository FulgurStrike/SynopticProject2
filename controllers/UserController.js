const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

const signupContent = {
  title: "Sign Up",
  formHeaderText: "Sign Up",
  firstNameLabel: "First Name",
  lastNameLabel: "Last Name",
  emailLabel: "Email",
  passwordLabel: "Password",
  submitButtonText: "Create Account",
  alreadyHaveAccount: "Already have an account?",
  loginLinkText: "Login",
}


// Register Account
exports.registerUser = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    try {

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            console.log("duplicate email :", email)
            req.flash('error', 'Email already in use');
            req.flash('formData', req.body);
            return res.redirect('/signup');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,  
            password: hashedPassword
        });
        await user.save();
        req.flash('success', 'Account created successfully.');
        res.redirect('/login');

    } catch (err) {
        console.log(err);
        let errorMessage = "Something went wrong. Please try again.";

        if(err.code == 11000 && err.keyPattern?.email){
            errorMessage ="Email is already in use. Please try another";
        }

        console.log("Error:", errorMessage);
        console.log("Form data:", req.body);
        req.flash('error', errorMessage);
        req.flash('formData', req.body);
        return res.redirect('/signup');
    }
};

// Render sign up page
exports.renderSignupPage = (req, res) => {

    res.render('signupPage', {
        ...signupContent,
        formData: req.flash('formData')[0] || {}
    });
};
