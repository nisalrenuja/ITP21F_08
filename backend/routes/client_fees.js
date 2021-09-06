const express = require("express");
const Client_fees = require("../models/client_fees");

const router = express.Router();

//save clients...

router.post("/client_fee/save",(req,res)=>{
 let newClient_fee = new Client_fees(req.body);

    newClient_fee.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });   
        }
        return  res.status(200).json({
          success:"New Client fee saved successfully...",  
        });
    });
});

// get client fees 

router.get("/client_fees", (req,res) => {
    Client_fees.find().exec((err,client_fees) => {
        if(err) {
            return res.status(400).json({
                error:err,
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:client_fees,
        });
    });
});

//get a specific client fee

router.get("/client_fee/:invoiceno",(req,res) =>{
    let Client_fee_Id = req.params.invoiceno;

   Client_fees.findById(client_fee_Id,(err,client_fee) =>{
        if(err){
            return res.status(400).json({
                success:false, 
                err,
            });
        }

        return res.status(200).json({
            success:true,
            client_fee
        });
    });
});   

//update client fee

router.put("/client_fee/update/:invoiceno",(req,res)=> {
    Client_fees.findByIdAndUpdate(
        req.params.invoiceno,
        {
            $set:req.body,
        },
        (err,client_fee)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully",
            });
        }
    );
});

// delete client fee

router.delete("/client_fee/delete/:invoiceno",(req,res) => {
    Client_fees.findByIdAndRemove(req.params.invoiceno).exec((err,deletedClient_fee) =>{

        if(err)
         return res.status(400).json({
            message:"Delete unsuccesful",err 
        });

        return res.json({
            message:"Delete Succesfull", deletedClient_fee
        });
    });
});
        


module.exports = router;