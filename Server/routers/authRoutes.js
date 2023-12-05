const express = require("express");
const app = express();
const user = require("../Schemas/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.SECRET;
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post("/register" ,async(req,res)=>{
    try{
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;

        const userData = await user.findOne({email:email});
        if(!userData){
            password = await bcrypt.hash(password,10);
            req.body.password = password;
            await user.create({
                firstName:firstName,
                lastName : lastName,
                email:email,
                password:password,
            });
            const data = await user.findOne({email:email});
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: data._id
              }, secret);

              res.status(200).json({token:token})
        }else{
            res.status(422).json({status:true,message:"User Already Exists"});
        }


    }catch(e){
        res.status(422).json({status:false,message:e.message});
    }
    
});



router.post("/login",async(req,res)=>{
    console.log('coming');
    var email = req.body.email;
    var password = req.body.password;
    var userData = await user.findOne({email:email});

    if(userData != null){
        var result = await bcrypt.compare(password,userData.password);
        if(result===true){
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: userData._id
              }, secret);

              res.status(200).json({status:true,token:token})
        }else{
            res.status(422).json({status:false,message:"Password Does not match"})
        }
    }else{
        res.status(422).json({status:false,message:"User not Found"})
    }
});

module.exports = router;
