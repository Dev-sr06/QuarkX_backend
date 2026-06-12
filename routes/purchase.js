const {purchasemodel}=require("../db");
const {auth}=require("../middleware/user_auth_middleware");

const {Router}=require("express");
const purchaseRouter=Router();

purchaseRouter.post("/xyz",(req,res)=>{
   return res.send({
    msg:"purchased!"
   })
})

module.exports={
    purchaseRouter:purchaseRouter,
}