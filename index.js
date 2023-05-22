const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const jwt = require('jsonwebtoken')

require('./config/connection');

const userRoute = require("./routes/users");
const authRoute = require('./routes/auth');

app.use(express.json())
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.get('/api/test',(req, res)=>{
    console.log('successfull');
    res.send('success')
})

app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
        return;
    }else{
        console.log(`server started on PORT : ${PORT}`);
    }
})