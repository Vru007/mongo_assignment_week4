const User=require("../db/db")
function adminMiddleware(req,res,next){
      
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
            msg:"Admin not registered",
        })
    }

}

module.exports={
    adminMiddleware
}