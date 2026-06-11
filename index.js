const express=require("express");
const app=express();

const dotenv=require("dotenv");
dotenv.config();

app.use(express.json());

const {auth}=require("./middleware/middleware");
const {userRouter}=require("./routes/user");
const {adminRouter}=require("./routes/admin");
const {courseRouter}=require("./routes/course");
const {purchaseRouter}=require("./routes/purchase");

app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/purchase",purchaseRouter);
app.use("/course",courseRouter);

app.listen(process.env.PORT,()=>{
    console.log("listening at port no 5000,man");
})



