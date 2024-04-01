const express=require('express');
const {adminMiddleware}=require('../middleware/admin');
const { Course,Admin} = require('../db/db');
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

router.get('/courses',adminMiddleware,(req,res)=>{
        
    res.json({
        msg:"/admin/courses get req",
    })
});

module.exports = router;