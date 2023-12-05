const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.requireLogin = (req,res,next) =>{
   try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,secret);
        if(decoded){
            req.user = decoded.data;
            next();
        }else{
            res.json({status:false,message:"Not Authorized"})
        }
   }catch(e){
        res.status(422).json({status:false,message:e.message});
   }
} 