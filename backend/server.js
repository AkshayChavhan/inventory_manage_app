const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config();
const userRouter = require("./routes/userRoutes");


const app = express();
const PORT = process.env.PORT || 5000;
const DB_MONGOOSE = process.env.DB_MONGOOSE;



//router middleware
app.use("/api/users" , userRouter);




mongoose.connect(DB_MONGOOSE ,{
    useNewUrlParser : true ,
    useUnifiedTopology : true,
})

app.listen(PORT , ()=>{
    console.log(`DB connected and Listening to the PORT ${PORT}`)
})





