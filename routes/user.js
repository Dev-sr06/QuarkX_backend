const {Router}=require("express");
const userRouter=Router();
const z=require("zod");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const {usermodel}=require("../db");
const {user_auth}=require("../middleware/user_auth_middleware")

const dotenv=require("dotenv");
dotenv.config();

const JWT_SECRET_USER=process.env.JWT_SECRET_USER;

userRouter.post("/signup",async (req,res)=>{
     const required_body=z.object({
         email:z.string().email().min(4).max(40),
         firstname:z.string().min(3).max(20),
         lastname:z.string().min(3).max(20),
         password:z.string().min(8).max(20), 
     })

     const required_body_safe_parse=required_body.safeParse(req.body);

     if(!required_body_safe_parse.success){
        return res.status(400).send({
            msg:"invalid input format",
            error:required_body_safe_parse.error,
        })
     }

     const firstname=req.body.firstname;
     const lastname=req.body.lastname;
     const email=req.body.email;
     const password=req.body.password;

     const hashed_password=await bcrypt.hash(password,10);

    try{
         await usermodel.create({
         firstname:firstname,
         lastname:lastname,
         email:email,
         password:hashed_password,
     })
      res.status(200).send({
        msg:"data is inserted into db,congrats!"
      })
    }catch(err){
        return res.status(500).send({
            msg:"error while inserting into database",
            error:err,
        })
    }
});

userRouter.post("/signin",async (req,res)=>{
      
       const required_body=z.object({
         email:z.string().email().min(4).max(20),
         password:z.string().min(8).max(20), 
     })

     const required_body_safe_parse=required_body.safeParse(req.body);

     if(!required_body_safe_parse.success){
        return res.status(400).send({
            msg:"invalid input format",
            error:required_body_safe_parse.error,
        })
     }
      
     const user=await usermodel.findOne({
        email:req.body.email,
     })

     if(!user){
        return res.status(400).send({
            msg:"you have not signed up",
        })
     }

     const password_match=await bcrypt.compare(req.body.password,user.password);
     if(!password_match){
        return res.status(400).send({
            msg:"password not matched",
        })
     }

     const token=jwt.sign({
        _id:user._id.toString(),
     },JWT_SECRET_USER);

     return res.status(200).send({
        msg:"you have signed in!",
        token:token,
     })

})



module.exports={
    userRouter:userRouter,
}