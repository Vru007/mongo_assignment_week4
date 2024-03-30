const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://vrushik7143work:NqoMJ7YBt72GZFB2@cluster0.6kifwdf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const adminSchema= new mongoose.Schema({
     
   username:String,
   password:String,
});

const userSchema= new mongoose.Schema({
   
   username:String,
   password:String,
   
   purchasedCourses:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'Course'

      }
   ]
});

const courseSchema= new mongoose.Schema({
        
   title:String,
   description:String,
   price:Number,
    
});

const Admin= mongoose.model('Admin',adminSchema);
const User= mongoose.model('User',userSchema);
const Course= mongoose.model('Course',courseSchema);
module.exports={
   Admin,
   User,
   Course
}
