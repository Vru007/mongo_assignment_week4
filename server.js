const express=require('express');
const app = express();
const adminRoutes=require("./routes/adminRoute");
const dotenv=require('dotenv');
const userRoutes=require("./routes/userRoute");
const bodyParser = require('body-parser');
const PORT=8000;
const mongoose=require('mongoose');
dotenv.config();
app.use(bodyParser.json());
app.use('/admin',adminRoutes);
app.use('/users',userRoutes);
mongoose.connect(process.env.MONGO_URI).then(()=>{

    app.listen(PORT,()=>{
        console.log('listening on port 8000');
    });
}).catch(err=>{console.log(err)});

