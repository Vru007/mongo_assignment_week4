const {Admin}=require("../db/db")
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const secret_key=process.env.JWT_SECRET_KEY;

function adminMiddleware(req, res,next){
     const token=req.headers.authorization;
     const words=token.split(" ");
     const jwtToken=words[1];
     const decodedValue=jwt.verify(jwtToken,secret_key);

     if(decodedValue.adminname){
         req.adminname=decodedValue.adminname;
          next();

     }else{

        return res.status(403).json({
            msg:"Admin not Authorized"
        })
     }
}

//------------------------------- Without auth -------------------------
// function adminMiddleware(req,res,next){
      
//     const adminname=req.headers.adminname;
//     const adminpassword=req.headers.adminpassword;

//     const user=Admin.findOne({
//         adminname:adminname,
//         adminpassword:adminpassword,

//     })
      
//     if(user){
         
//         next();
//     }
//     else{
//         res.status(403).json({
//             msg:"Admin not registered",
//         })
//     }

// }

module.exports={
    adminMiddleware
}