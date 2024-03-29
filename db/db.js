const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://vrushik7143work:NqoMJ7YBt72GZFB2@cluster0.6kifwdf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const adminSchema= new mongoose.Schema({

});

const userSchema= new mongoose.Schema({


});

const courseSchema= new mongoose.Schema({

});

const Admin= mongoose.model('Admin',adminSchema);
const User= mongoose.model('User',userSchema);
const Course= mongoose.model('Course',courseSchema);
module.exports={
   Admin,
   User,Course
}
