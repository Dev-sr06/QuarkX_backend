const {adminmodel}=require("../db");
const {admin_auth}=require("../middleware/admin_auth_middleware");
const z=require("zod");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const {Router}=require("express");
const adminRouter=Router();

const JWT_SECRET_ADMIN=process.env.JWT_SECRET_ADMIN;


adminRouter.post("/signup",async (req,res)=>{
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
         await adminmodel.create({
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

adminRouter.post("/signin",async (req,res)=>{
      
       const required_body=z.object({
         email:z.string().email().min(4).max(40),
         password:z.string().min(8).max(20), 
     })

     const required_body_safe_parse=required_body.safeParse(req.body);

     if(!required_body_safe_parse.success){
        return res.status(400).send({
            msg:"invalid input format",
            error:required_body_safe_parse.error,
        })
     }
      
     const admin=await adminmodel.findOne({
        email:req.body.email,
     })

     if(!admin){
        return res.status(400).send({
            msg:"you have not signed up",
        })
     }

     const password_match=await bcrypt.compare(req.body.password,admin.password);
     if(!password_match){
        return res.status(400).send({
            msg:"password not matched",
        })
     }

     const token=jwt.sign({
        _id:admin._id.toString(),
     },JWT_SECRET_ADMIN);
  
     return res.status(200).send({
        msg:"you have signed in!",
        token:token,
     })

})


module.exports={
    adminRouter:adminRouter,
}


