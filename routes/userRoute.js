const express=require('express');
const userMiddleware=require('../middleware/user');
const router=express.Router();
const User=require("../db/db");

router.post('/signup',userMiddleware,(req,res)=>{
      const username=req.body.username;
      const passsword=req.body.password;

      User.create({
         username:username,
         password:passsword,
      })

      res.status(200).json({
        msg: 'User created successfully',
      })
});

router.post('/courses',userMiddleware,(req,res)=>{
      

});

router.get('/courses',userMiddleware,(req,res)=>{
     

});

module.exports = router;