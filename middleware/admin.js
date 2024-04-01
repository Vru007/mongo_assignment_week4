const {Admin}=require("../db/db")
function adminMiddleware(req,res,next){
      
    const adminname=req.headers.adminname;
    const adminpassword=req.headers.adminpassword;

    const user=Admin.findOne({
        adminname:adminname,
        adminpassword:adminpassword,

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