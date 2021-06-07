const {validationResult} = require ("express-validator");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");
const Users = db.User;

const userController = {
    login: (req,res)=>{
    return res.render("./login")
    },

    processLogin:  async function (req,res) {
        try{
            let errors = validationResult(req);
            if(!errors.isEmpty()){             
            return res.render("./login", {
                    errors: errors.mapped(),
                    oldData: req.body
                });
            } 

        let userToLogin =  await Users.findOne({  
            where: { 
                    email: req.body.email
                }
            });

        if(userToLogin){                                                        
            let passwordCheck = bcryptjs.compareSync(req.body.password, userToLogin.password);     
            
            if(passwordCheck){
                delete userToLogin.password;                        
                req.session.userLogged= userToLogin;                
                if(req.body.user_remember){                       
                    res.cookie("userEmail", req.body.email, {maxAge: (1000* 60)*4})
                }
                return res.redirect("/");
            }
            return res.render("./login", {
                errors:{
                    password: {
                        msg: "la contraseña ingresada es incorrecta"
                    }
                },
                oldData: req.body
            })
        }

        return res.render("./login", {
            errors:{
                email: {
                        msg: "Usuario no registrado"
                }
            },
            oldData: req.body
        })
        }catch(error){

        }
    },


    register:(req,res)=>{
        return res.render("./register")
    },

    processRegister:async function(req,res) {        
        try{
            let errors = validationResult(req);
            console.log(errors)
            if(!errors.isEmpty()){                       
            return res.render("./register", {
                errors: errors.mapped(),
                oldData: req.body
            });
        }

        let createdUser =  await Users.findOne({      
            where: { 
                email: req.body.email
            }
        });

        if(createdUser){                          
            return res.render("./register", {
                errors: {
                    email: {
                        msg:"Este email ya esta registrado"
                    }
                },
                oldData: req.body
            });
        } 

        let newUser={                                                 
            ...req.body,                              
            password: bcryptjs.hashSync(req.body.password, 10)       
        }
        await Users.create(newUser);                                
        return res.redirect("/users/login")

        }catch(errors){
            console.log(errors);
            res.render("./error404")
        }
    },

    logout: (req,res)=>{
        res.clearCookie("userEmail")
        req.session.destroy();
        return res.redirect("/")
    }
        
        
        
}

module.exports=userController;