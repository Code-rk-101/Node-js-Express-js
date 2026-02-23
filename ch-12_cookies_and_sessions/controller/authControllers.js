exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        isLoggedin: false,
    });
};

exports.postLogin = (req, res, next) => 
{
    const { email, password } = req.body;
    // TODO: Add authentication logic here
    console.log("Login attempt:", email);

    req.session.isLoggedin = true;
    // res.cookie("isLoggedin",true)
    res.redirect('/');
};

exports.postLogout = (req, res, next) => 
{
    req.session.destroy(()=>
    {
        res.redirect('/login');
    });
};
