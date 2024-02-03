const express=require('express')
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const app=express();
require("dotenv").config();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/autho")
.then(console.log("Database is connencted successfully"))
.catch(err=>{err.message});
const router=require("./routes/routes");
app.use(cookieParser());
// app.use(cors());
app.use(cors(
    {
    credentials: true,  // Allows sending cookies with cross-origin requests
    origin: 'http://localhost:3000',  // Replace with your frontend's actual origin
    methods:["POST","GET"]
  }
  ));

app.use("/",router);
app.listen(process.env.PORT,()=>{console.log("Server is started successfully")});
