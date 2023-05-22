const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('connected to DATABASE');
}).catch((err)=>{
    console.log(`Error occured ${err}`);
})