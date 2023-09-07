const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./errorMiddleware/errorMiddleware");
const cookieParser = require("cookie-parser")

const app = express();


// DB and PORT connection
const PORT = process.env.PORT || 5000;
const DB_MONGOOSE = process.env.DB_MONGOOSE;


// middleware used
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended : false }));
app.use(bodyParser.json());




// routes
app.get("/",(req,res) =>{
    res.send("Hey hi its GET HOMEPAGE REQUEST")
})

// Error middleware
app.use(errorHandler);

//router middleware
app.use("/api/users" , userRouter);







// firing DB and server
mongoose.connect(DB_MONGOOSE ,{
    useNewUrlParser : true ,
    useUnifiedTopology : true,
})

app.listen(PORT , ()=>{
    console.log(`DB connected and Listening to the PORT ${PORT}`)
})





