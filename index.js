const express=require("express");
const app=express();

const dotenv=require("dotenv");
dotenv.config();

app.use(express.json());

const {auth}=require("./middleware/user_auth_middleware");
const {userRouter}=require("./routes/user");
const {adminRouter}=require("./routes/admin");
const {courseRouter}=require("./routes/course");

app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/course",courseRouter);

app.listen(process.env.PORT,()=>{
    console.log("listening at port no 5000,man");
})



