function auth(req,res,next){
     const token=req.headers.token;
     const decoded_data=jwt.verify(token,JWT_SECRET);

     if(!decoded_data){
         return res.status(400).send({
            msg:"invalid token",
         })
     }

     req.id=decoded_data._id;
     next();

}

module.exports={
    auth:auth,
}