const express = require("express");
const LogoutApi = express.Router();
const UserData = require("../../../models/userModel");
const jwt = require('jsonwebtoken')
require("../../../DB/conn");
LogoutApi.use(express.json());

LogoutApi.get("/api/logout", async (req, res) => {
    try {
        try {
            const token = req.cookies.jwtoken
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
            const rootUser = await UserData.findOne({ _id: verifyToken._id, "tokens.token": token });

            if (!rootUser) { throw new Error('user not found') }
            else {
                rootUser.tokens = rootUser.tokens.filter(tokenObj => tokenObj.token !== token);
                await rootUser.save();
                res.clearCookie('jwtoken', { path: '/', httpsOnly: true, sameSite: 'None', secure: true })
                res.status(200).json({ success: "logout success" })
            }
        } catch (error) {
            res.status(401).send("unauthorized: token not provided")
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
},
);

module.exports = LogoutApi;
