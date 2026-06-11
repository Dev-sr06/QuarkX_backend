const {purchasemodel}=require("../db");
const {auth}=require("../middleware/middleware");

const {Router}=require("express");
const purchaseRouter=Router();

purchaseRouter.post("/xyz",auth,(req,res)=>{
   return res.send({
    msg:"purchased!"
   })
})

module.exports={
    purchaseRouter:purchaseRouter,
}