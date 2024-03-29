const express=require('express');
const adminMiddleware=require('../middleware/admin');
const router=express.Router();

router.post('/courses',adminMiddleware,(req,res)=>{

});

router.post('/signup',adminMiddleware,(req,res)=>{

});

router.get('/courses',adminMiddleware,(req,res)=>{
        
    res.json({
        msg:"/admin/courses get req",
    })
});

module.exports = router;