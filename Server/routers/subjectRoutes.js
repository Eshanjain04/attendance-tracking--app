const subject = require("../Schemas/subject");
const express = require("express");
const app = express();
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

function calculatepercent(a,b){
    return `${parseInt((a/(b))*100)}%`
}

router.get("/list",async (req,res)=>{
    try{
        subject.find().populate("users").then(data=>{
            var subject_name = new Set();
            for(var i of data){
                if(i.users._id.valueOf()===req.user){
                    subject_name.add(i);
                }
            }
            let finalArr = [];
            for(let i of subject_name){
                finalArr.push(i);
            }
            res.status(200).json({data:finalArr});
        })
    }
    catch(e){
        res.status(422).json({message:e.message});
    }
    

});

router.post("/add", async (req,res)=>{
    try{
        let sub = await subject.findOne({name:req.body.subjectName})

        if(sub){
            return res.status(422).json({message:"Subject Already Exists"});
        }
    
        await subject.create({name:req.body.subjectName,attendance:0,percentage:"0%",totalClass:0,users:req.user});
        res.status(201).json({message:"Created"})
    }
    catch(e){
        res.status(422).json({message:e.message});
    }
})

router.post("/attend/:id",async (req,res)=>{
    try{
        const data = await subject.findOne({_id:req.params.id});
        let totalClass = data.totalClass;
        totalClass += 1;
        data.totalClass++;
        const previousAttendance = data.attendance;
        const updatedAttendance = previousAttendance + 1;
        const percentage = calculatepercent(updatedAttendance,totalClass);
        await subject.updateOne({_id:req.params.id},{$set:{attendance:updatedAttendance,percentage:percentage,totalClass:totalClass}});
        res.status(200).json({message:"attended"})
    }
    catch(e){
        res.status(422).json({message:e.message});
    }

})

router.post("/missed/:id",async (req,res)=>{
    try{
        const data = await subject.findOne({_id:req.params.id});
        let totalClass = data.totalClass;
        totalClass += 1;
        const previousAttendance = data.attendance;
        const percentage = calculatepercent(previousAttendance,totalClass);
        await subject.updateOne({_id:req.params.id},{$set:{percentage:percentage,totalClass:totalClass}});
        res.status(200).json({message:"Missed"})
    }
    catch(e){
        res.status(422).json({message:e.message});
    }
});

router.delete("/:id/delete",async (req,res)=>{
    try{
        await subject.deleteOne({_id:req.params.id});
        res.status(200).json({message:"Deleted Successfully"})
    }
    catch(e){
        res.status(422).json({message:e.message});
    }
});

module.exports = router;