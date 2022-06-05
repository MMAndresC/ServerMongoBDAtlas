
const passport = require('passport');



const registerUser = async(req,res,next) =>{
    const {email, password} = req.body;
    if(!email || !password){
        const error = new Error('email & password are required');
        error.status = 400; 
        return next(error);
    }

/*     const done = (user,err) =>{
        if(err){
            return next(err);
        }
    }

    req.logIn(user, (error) =>{
        if(error){
            return next(error);
        }
        return res.status(201).json(user);
    }) */

}

const loginUser = () =>{

}

const logoutUser = () =>{

}



module.exports = {
    registerUser,
    loginUser,
    logoutUser
}