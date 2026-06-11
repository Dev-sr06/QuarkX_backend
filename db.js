const mongoose=require("mongoose");
const { int } = require("zod");
const dns=require("dns");
const { StringDecoder } = require("string_decoder");
const dotenv=require("dotenv");
dotenv.config();

dns.setServers([process.env.SERVER_1,process.env.SERVER_2]);
mongoose.connect(process.env.URL)
.then(()=>{
    console.log("connected to mongodb servers");
})
.catch((err)=>{
    console.log("error while connecting to mongo db servers!!!")
})

const user_schema=new mongoose.Schema({
  
    email:{
        type:String,unique:true,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    }
    ,password:{
        type:String,
        required:true,
    }
})

const admin_schema=new mongoose.Schema({
 
    email:{
        type:String,
        unique:true,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }

})

const course_schema=new mongoose.Schema({
     title:{
        type:String,
        required:true,
        unique:true,
     }
      ,Description:{
        type:String,
        required:true,
      },
      price:{
        type:Number,
        required:true,
      },
      imageURL:{
        type:String,
        required:true,
      },
      creatorId:{
        type:mongoose.Schema.Types.ObjectId,
      }
})

const purchase_schema=mongoose.Schema({
     userId:mongoose.Schema.Types.ObjectId,
     courseId:mongoose.Schema.Types.ObjectId,
})

const usermodel=mongoose.model("user_data",user_schema);
const adminmodel=mongoose.model("admin_data",admin_schema);
const coursemodel=mongoose.model("course_dat",course_schema);
const purchasemodel=mongoose.model("purchase_data",purchase_schema);

module.exports={
    usermodel:usermodel,
    adminmodel:adminmodel,
    coursemodel:coursemodel,
    purchasemodel:purchasemodel,
}