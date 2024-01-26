const express = require("express");
const { check,validationResult } = require("express-validator");
const userAuth = require("../../../middleware/userAuth");
const ChangeEmail = express.Router();
const UserData = require("../../../models/userModel");
const bcrypt=require('bcrypt')
require("../../../DB/conn");
ChangeEmail.use(express.json());
ChangeEmail.post(
    "/api/ChangeEmail",
    [
        // Validation rules using express-validator
        check("oldEmail").isEmail().withMessage("Old email doesn't match").custom((value,)=>{
            if (value!==UserData.email) {
                throw new Error("old email doesnt match")
            }
            return true;
        
        }),
        check("newEmail").isEmail().withMessage("Invalid email address").custom((value,{req})=>{
            if(value===req.body.oldEmail){
                throw new Error("new email cannot be same as old email")
            }
            return true
        }),
        check('confirmNewEmail').isEmail().withMessage("invalid email in comfirm email address").custom((value,{req})=>{
            if (value!==req.body.newEmail) {
                throw new Error("emails do not match")
            }
            return true;
        })

        
    ],userAuth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        //now to change email
        try {
            const user = await UserData.findOne({ email: req.rootUser.email })
            if (user && await bcrypt.compare(req.body.oldEmail, user.email)) {
                user.email=req.body.newEmail
                user.save()
                return res.status(201).json({ success: "email changed" })
            }

        } catch (error) {
            res.status(500).json({error:"internal server error"})
        }
    });

module.exports = ChangeEmail;
