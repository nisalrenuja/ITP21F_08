const express = require("express");
const Clients = require("../models/clients");

const router = express.Router();

//save clients...

router.post("/client/save", (req,res ) => {
 let newClient = new Clients(req.body);

    newClient.save((err) => {
        if(err) {
            return res.status(400).json({
                error:err,
          });   
        }
        return  res.status(200).json({
          success:"New Client saved successfully...",  
        });
    });
});

// get clients 

router.get("/clients", (req,res) => {
    Clients.find().exec((err, clients) => {
        if(err) {
            return res.status(400).json({
                error: err,
            });
        }
        return res.status(200).json({
            success:true,
            existingClients: clients,
    });
  });
});

//get a specific client (GET)

router.get("/client/:id",(req,res) =>{
    let ClientId = req.params.id;

   Clients.findById(ClientId, (err,client) =>{
        if(err){
            return res.status(400).json({
                success:false, 
                err,
         });
        }

        return res.status(200).json({
            success: true,
            client
        });
    });
});   

//update client (PUT)

router.put("/client/update/:id",(req,res)=> {
    Clients.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body,
        },
        (err,client)=>{
            if (err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully..!!",
            });
        }
    );
});

// delete client

router.delete("/client/delete/:id",(req,res) => {
    Clients.findByIdAndRemove(req.params.id).exec((err,deletedClient) =>{

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