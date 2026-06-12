const { jwt } = require("zod");
const dotenv=require("dotenv");
const { decode } = require("jsonwebtoken");
dotenv.config();

const JWT_SECRET_ADMIN=process.env.JWT_SECRET_ADMIN;

function auth(req,res){
     
    const token=req.headers.token;
    const decoded_data=jwt.verify(token,JWT_SECRET_ADMIN);

    if(!decoded_data){
       return res.status(400).send({
        msg:"invalid token",
       })  
    }
   req.adminId=decoded_data._id;
   next();
}

module.exports={
    admin_auth:auth,
};