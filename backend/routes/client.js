const express = require("express");
const Clients = require("../models/client");

const router = express.Router();

//save clients...

router.post("/client/save",(req,res)=>{
 let newClient = new Clients(req.body);

    newClient.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });   
        }
        return  res.status(200).json({
          success:"New Client saved successfully...",  
        });
    });
});

// get clients 

router.get("/clients", (req,res) => {
    Clients.find().exec((err,clients) => {
        if(err) {
            return res.status(400).json({
                error:err,
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:clients,
        });
    });
});

//get a specific client

router.get("/client/:clientno",(req,res) =>{
    let ClientId = req.params.clientno;

   Clients.findById(clientId,(err,client) =>{
        if(err){
            return res.status(400).json({
                success:false, 
                err,
            });
        }

        return res.status(200).json({
            success:true,
            client
        });
    });
});   

//update client

router.put("/client/update/:clientno",(req,res)=> {
    Clients.findByIdAndUpdate(
        req.params.clientno,
        {
            $set:req.body,
        },
        (err,client)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully",
            });
        }
    );
});

// delete client

router.delete("/client/delete/:clientno",(req,res) => {
    Clients.findByIdAndRemove(req.params.clientno).exec((err,deletedClient) =>{

        if(err)
         return res.status(400).json({
            message:"Delete unsuccesful",err 
        });

        return res.json({
            message:"Delete Succesfull", deletedClient
        });
    });
});
        


module.exports = router;