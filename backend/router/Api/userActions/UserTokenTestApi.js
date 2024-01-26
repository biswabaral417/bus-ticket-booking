const express = require('express')
const TokenAuthenicationApi = express.Router()
const UserAuth = require('../../../middleware/userAuth');
require("../../../DB/conn");
TokenAuthenicationApi.use(express.json());

TokenAuthenicationApi.get('/api/Tokentest', UserAuth, (req, res) => {
    try {
        if (req.rootUser) {
            res.status(200).json({success:true})
        } else {
            res.status(401).json({error:false})
        }
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
   
});

module.exports = TokenAuthenicationApi;