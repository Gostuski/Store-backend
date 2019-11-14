module.exports = {
    ensureAuthenticated : function(req, res, nest){
        if(req.isAuhenticated){
            return next();
        }
        //Flash to login
        res.redirect('/users/login');
    }
}