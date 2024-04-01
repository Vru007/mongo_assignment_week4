const {User}=require('../db/db')
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const secret_key=process.env.JWT_SECRET_KEY


function userMiddleware(req, res, next) {
    const bearer=req.headers.authorization;
    const words=bearer.split(" ");
    const token=words[1];
    const decodedValue = jwt.verify(token,secret_key);

    if(decodedValue.username){
        req.username=decodedValue.username;
        next();

    }
    else{
        return res.status(403).json({
            msg:"User Not Authenticated"
        })
    }
}




// function userMiddleware(req, res, next) {
       
//     const username=req.headers.username;
//     const password=req.headers.password;
     
//     const user=User.findOne({
//         username:username,
//         password:password,

//     })
      
//     if(user){
         
//         next();
//     }
//     else{
//         res.status(403).json({
//             msg:"User not found",
//         })
//     }

// }

module.exports={
    userMiddleware
}