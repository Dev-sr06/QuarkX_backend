const {Router}=require("express");
const courseRouter=Router();

const {coursemodel, purchasemodel}=require("../db");
const {user_auth}=require("../middleware/user_auth_middleware");
const {admin_auth}=require("../middleware/admin_auth_middleware");

courseRouter.post("/purchase",admin_auth,async (req,res)=>{
      const {courseId,userId}=req.body;

      await purchasemodel.create({
        userId:userId,
        courseId:courseId,
      })

      return res.status(200).send({
        msg:"you have successfully bought the course!"
      });
});

courseRouter.get("/preview",async(req,res)=>{
      const courses=await coursemodel.find({});
      return res.status(200).send({
        msg:"list of all courses here!",
        courses:courses
      })
})


module.exports={
     courseRouter:courseRouter,
}