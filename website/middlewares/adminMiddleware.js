function adminMiddleware(req,res,next){
    if(!req.session.userLogged){
        return res.redirect("/");
    }else if(req.session.userLogged.rol == 0){
        return res.redirect("/");
    }
    next();
}
module.exports=adminMiddleware;