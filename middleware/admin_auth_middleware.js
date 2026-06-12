const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

const JWT_SECRET_ADMIN=process.env.JWT_SECRET_ADMIN;

function auth(req,res,next){
     
    const token=req.headers.token;
    const decoded_data=jwt.verify(token,JWT_SECRET_ADMIN);

    if(!decoded_data){
       return res.status(400).send({
        msg:"invalid token",
       })  
    }
   req.admin_Id=decoded_data._id;
   next();
}

module.exports={
    admin_auth:auth,
};