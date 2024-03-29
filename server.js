const express=require('express');
const app = express();
const adminRoutes=require("./routes/adminRoute");
const userRoutes=require("./routes/userRoute");
const bodyParser = require('body-parser');
const PORT=8000;

app.use(bodyParser.json());
app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.listen(PORT,()=>{
    console.log('listening on port 8000');
});