const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

const JWT_SECRET_USER=process.env.JWT_SECRET_USER

function auth(req,res,next){
     const token=req.headers.token;
     const decoded_data=jwt.verify(token,JWT_SECRET_USER);

     if(!decoded_data){
         return res.status(400).send({
            msg:"invalid token",
         })
     }

     req.user_id=decoded_data._id;
     next();

}

module.exports={
    user_auth:auth,
}