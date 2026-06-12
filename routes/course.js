const {Router}=require("express");
const courseRouter=Router();

const {coursemodel}=require("../db");
const {auth}=require("../middleware/user_auth_middleware");

courseRouter.post("/course",(req,res)=>{
     return res.send({
        msg:"course added",
     })
});



module.exports={
     courseRouter:courseRouter,
}