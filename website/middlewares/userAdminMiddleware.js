function userAdminMiddleware(req,res,next){
    if(!req.session.userLogged){
        return res.redirect("/users/login");
    }else if(req.session.userLogged.rol == 0){
        return res.redirect("/");
    }
    next();
}
module.exports=userAdminMiddleware;