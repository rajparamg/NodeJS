const express = require('express');
const app = express()
const port=3001
//routes
app.get('/', (req,res)=>{
res.send('Hello From Node Server');
})
app.get('/test', (req,res)=>{
    res.send('Hello Check Raju');
    })
app.listen(port,()=>{
    console.log('my node app is running...');
})