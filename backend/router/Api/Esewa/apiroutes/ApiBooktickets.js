const express=require("express")
const router=express.Router()
const generateTicket=require("../functions/generateTicket")
const createSignature=require("../functions/createSignature")
const userAuth=require("../../../../middleware/userAuth")
const secretKeyEsewa = process.env.esewaKey;

router.post('/api/bookTickets', userAuth, async (req, res) => {
    try {
    const ticket=await generateTicket(req,res)
    let message=`total_amount=${ticket.TotalPrice},transaction_uuid=${ticket._id.toString()},product_code=EPAYTEST`
    const signature=createSignature(message,secretKeyEsewa)

    const formData={
        "amount": ticket.TotalPrice,
        "failure_url": "https://localhost:9000/api/esewaPayment/failure",
        "product_delivery_charge": "0",
        "product_service_charge": "0",
        "product_code": "EPAYTEST",
        "signature": signature,
        "signed_field_names": "total_amount,transaction_uuid,product_code",
        "success_url": "https://localhost:9000/api/esewaPayment/success",
        "tax_amount": "0",
        "total_amount":ticket.TotalPrice,
        "transaction_uuid": ticket._id.toString()
    }    

    
        return res.status(200).json({message:"order created sucessfull",ticket, formData})   
    } catch (error) {
        return res.status(400).json({error:"no orders found"})
    }
});
module.exports=router
