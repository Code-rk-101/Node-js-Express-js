const { check, validationResult } = require("express-validator");
const User = require("../Models/user");
const bcrypt = require('bcryptjs')
exports.getSignUp = (req, res, next) => {
    res.render('auth/signUp', {
        pageTitle: 'SignUP',
        isLoggedin: false,
        errors:[],
        oldInput: {firstname:"",lastname:"",email:"",password:"",role:""},
        user: {},
    });
};

exports.postSignUp = [
check('firstname')
    .notEmpty()
    .withMessage('First name is required')
    .trim()
    .isLength({min: 2})
    .withMessage('First name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain alphabets'),

check('lastname')
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage('Last name can only contain alphabets'),

check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

check('password')
    .isLength({min:8})
    .withMessage('Password should be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must have at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must have at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must have at least one numeric value')
    .matches(/[!@&]/)
    .withMessage('Password must have at least one special character (!@&)')
    .trim(),

check('confirmPassword')
    .trim()
    .custom((value,{req})=>
    {
        if(value !== req.body.password)
        {
            throw new Error("Passwords do not match")
        }
        return true;
    }),

check('role')
    .notEmpty()
    .withMessage('Please select the user type')
    .isIn(['guest','host'])
    .withMessage('Invalid user type'),
    
check('terms')
    .notEmpty()
    .withMessage('Please accept the terms and conditions.')
    .custom((value,{req})=>
    {
        if(value !== 'on')
            throw new Error("Please accept the terms and conditions");
        return true;
    }),
    
(req,res,next)=>
{
    const {firstname,confirmPassword,lastname,email,password,role,terms} = req.body
    // console.log(firstname,lastname,email,password,confirmPassword,role,terms);
    const  errors = validationResult(req);
    // console.log(errors);
    
    
    if(!errors.isEmpty())
    {
        return res.status(422).render('auth/signUp',
            {
                pageTitle: 'Sign Up',
                isLoggedin: false,
                errors : errors.array().map(err=>err.msg),
                oldInput : {firstname,lastname,email,password,role},
                user: {},
            }
        )
    };

    bcrypt.hash(password, 12)
    .then((hashedPassword)=>
    {
        console.log(hashedPassword);
        
        const user =  new User({firstname,lastname,email,password:hashedPassword,role,});
        return user.save();
    })
    .then(()=>
    {
        res.redirect("/login");
    })
    .catch(err=>
    {
        return res.status(422).render('auth/signUp',
            {
                pageTitle: 'Sign Up',
                isLoggedin: false,
                errors : [err.message],
                oldInput : {firstname,lastname,email,password,role},
                user: {},
            }
        )   
    })
}];

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        isLoggedin: false,
        errors : [],
        oldInput : {email:""},
        user: {},
    });
};

exports.postLogin = async (req, res, next) => 
{
    try
    {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user)
        {
            return res.render('auth/login', 
            {
                pageTitle: 'Login',
                isLoggedin: false,
                errors : ['User does not exists'],
                oldInput : {email},
                user: {},
            }); 
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.render('auth/login', 
            {
                pageTitle: 'Login',
                isLoggedin: false,
                errors : ['Invalid password'],
                oldInput : {email:email},
                user: {},
            }); 
        }
        req.session.isLoggedin = true;
        req.session.user = user;
        await req.session.save();
        res.redirect('/');
    }
    catch(err) {
        console.log(err);
        res.status(500).render('auth/login', {
            pageTitle: 'Login',
            isLoggedin: false,
            errors: ['Something went wrong, please try again.'],
            oldInput: {email: req.body.email},
        });
    }
};

exports.postLogout = (req, res, next) => 
{
    req.session.destroy(()=>
    {
        res.redirect('/login');
    });
};
