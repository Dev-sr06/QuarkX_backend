const {Router}=require("express");
const courseRouter=Router();

const {coursemodel}=require("../db");
const {auth}=require("../middleware/middleware");

courseRouter.post("/course",auth,(req,res)=>{
     return res.send({
        msg:"course added",
     })
});



module.exports={
     courseRouter:courseRouter,
}