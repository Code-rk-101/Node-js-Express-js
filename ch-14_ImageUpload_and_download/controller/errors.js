exports.Error = (req,res,next) =>
{
        res.status(404).render('404', 
        {
                pageTitle : 'Page Not Found',
                isLoggedin: req.isLoggedin,
                user: req.session.user,
        });
};
