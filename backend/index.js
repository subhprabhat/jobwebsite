import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import mongoose, { connect } from 'mongoose'
import connectDB from "./utils/db.js"
import dotenv from 'dotenv'
import userRoute from "./routes/user.route.js"
import companyRoutes from "./routes/company.route.js"
import JobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import path, { dirname } from 'path';


// console.log("Loaded ENV:", process.env);
// dotenv.config({ debug: false });
// dotenv.config({ quiet: true });
dotenv.config({});
const app = express();

const _dirname = path.resolve();


// middlewares 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

const corsOptions={
  origin:'https://jobwebsite-vyg8.onrender.com',
  credentials:true
}





let PORT = process.env.PORT || 3000
app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); //iske wajah se dikkat aa raha tha jo ki server nhi chal raha tha -> lets see kya hota hai next
// app.options('*', cors()) // include before other routes



// api 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", JobRoute);
app.use("/api/v1/application", applicationRoute);


 app.use(express.static(path.join(_dirname,"/frontend/dist")));
 app.get("/*splat",(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
 })


app.get('/', (req, res) => {
  res.send('Server toh chal raha hai abhi')
})

app.listen(PORT, () => {
  connectDB();
  console.log(`listening server ${PORT}`)
})
