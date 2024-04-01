const express=require('express');
const {userMiddleware}=require('../middleware/user');
const router=express.Router();
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

router.post('/courses/:courseId',userMiddleware,async (req,res)=>{
      
     const courseId=req.params.courseId;
     const username=req.headers.username;

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
      
    const user=await User.findOne({username:req.headers.username})
    

  

    const courses=await Course.find({
        _id:{
            "$in":user.purchasedCourses 
           }
    })
     
    return res.json(courses);
  
       
});

module.exports = router;