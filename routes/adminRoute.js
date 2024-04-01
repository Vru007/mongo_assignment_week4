const express=require('express');
const {adminMiddleware}=require('../middleware/admin');
const { Course,Admin} = require('../db/db');
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const SECRET_KEY=process.env.JWT_SECRET_KEY;
const router=express.Router();

router.post('/courses',adminMiddleware,(req,res)=>{
            
      const title=req.body.title;
      const description=req.body.description;
      const price=req.body.price;
      
      Course.create({title, description, price}).then(function(value){
        if(value){
            console.log(value);
            res.status(200).json(   
                console.log(value)
            )
        }
      }).catch(function(err){
             console.log(err);
      });
});

router.post('/signup',async (req,res)=>{
           const adminname=req.body.adminname;
           const adminpassword=req.body.adminpassword;

           await Admin.findOne({adminname: adminname}).then(async function(value){
            if(value){
                return res.status(401).json({
                    msg: 'Admin name already exists'
                })
            }
            else{
                     
                await Admin.create({adminname: adminname, adminpassword: adminpassword}).then(function(value){
                    if(value){
                        res.status(200).json({msg: 'Admin created successfully'});
                    }
                    
                }).catch(function(err){
                    console.log(err);
                })
            }
           })
});

router.post("/signin",async (req,res)=>{

    const adminname=req.body.adminname;
    const adminpassword=req.body.adminpassword;
    
    await Admin.findOne({
     adminname,adminpassword
    }).then(function(value){
     
     if(value){
       const token=jwt.sign({adminname},SECRET_KEY)
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
 
 })


router.get('/courses',adminMiddleware,async (req,res)=>{
        
    const courses=await Course.find({});
    res.json(courses);
});

module.exports = router;