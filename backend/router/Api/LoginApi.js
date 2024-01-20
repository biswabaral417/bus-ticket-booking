const express = require("express");
const { check, validationResult } = require("express-validator");
const LoginApi = express.Router();
const UserData = require("../../models/userModel");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require("../../DB/conn");
LoginApi.use(express.json());

LoginApi.post(
    "/api/login",
    [
        // Validation rules using express-validator
        check("email").isEmail().withMessage("Invalid email address"),
        check("password").isStrongPassword().withMessage("Password must be strong"),
    ],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            const Verify = await UserData.findOne({ email: req.body.email })
            console.log(jwt.verify)
            if (Verify && await bcrypt.compare(req.body.password, Verify.password)) {
                const token = await Verify.generateAuthtoken();
                console.log(token);
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 2630000000),
                    httpsOnly: true,
                    sameSite: "None",
                    secure: true
                })
                return res.status(201).json({ success: "successful login" })
            }
            else {
                res.status(422).json({ error: "given credentials are incorrect" })
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Server error" });
        }
    },
);

module.exports = LoginApi;
