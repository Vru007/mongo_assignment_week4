const {User}=require('../db/db')
function userMiddleware(req, res, next) {
       
    const username=req.headers.username;
    const password=req.headers.password;
     
    const user=User.findOne({
        username:username,
        password:password,

    })
      
    if(user){
         
        next();
    }
    else{
        res.status(403).json({
            msg:"User not found",
        })
    }

}

module.exports={
    userMiddleware
}