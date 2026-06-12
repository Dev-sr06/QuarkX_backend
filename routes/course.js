const {Router}=require("express");
const courseRouter=Router();

const {coursemodel}=require("../db");
const {user_auth}=require("../middleware/user_auth_middleware");
const {admin_auth}=require("../middleware/admin_auth_middleware");

courseRouter.post("/add",admin_auth,(req,res)=>{
     
});




module.exports={
     courseRouter:courseRouter,
}