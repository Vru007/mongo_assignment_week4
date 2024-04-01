const express=require('express');
const {userMiddleware}=require('../middleware/user');
const router=express.Router();
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const SECRET_KEY=process.env.JWT_SECRET_KEY;

const {User,Course}=require("../db/db");

router.post('/signup',async (req,res)=>{
      const username=req.body.username;
      const passsword=req.body.password;
     await User.findOne({
        username: username,
      }).then(async function(value){
        if(value){
          return res.status(201).json({
            msg:'Username Already Exists!'
        })
      } 
        else{
            
          await User.create({
            username:username,
            password:passsword,
         })
          
         return res.status(200).json({
           msg: 'User created successfully',
         })
        }
        
      })
});

router.post("/signin",async(req,res)=>{

   const username=req.body.username;
   const password=req.body.password;
    
    await User.findOne({
    username:username,password:password
   }).then(function(value){
    if(value){
      const token=jwt.sign({username},SECRET_KEY)
      res.json({token});
    }
    else
    {
      res.status(403).json({
        msg:"User not found"
      })
    }

}).catch((err)=>{
  console.log(err);
})


});

router.post('/courses/:courseId',userMiddleware,async (req,res)=>{
      
     const courseId=req.params.courseId;
     const username=req.username;
     await User.updateOne({
        username:username
     },{
        "$push":{
            purchasedCourses:courseId
        }
     }).then(()=>{
     res.json({
        msg:"Course Purchased successfully",
     })}).catch((err)=>{
      console.error(err);
     })

});


router.get('/purchasedCourses',userMiddleware,async (req,res)=>{
      const username=req.username;
    const user=await User.findOne({username:username})
    
   const courses=await Course.find({
        _id:{
            "$in":user.purchasedCourses 
           }
    })
     
    return res.json(courses);
  
       
});

module.exports = router;