const CryptoJS = require('crypto-js')
const createSignature = (message, secretKey) => {
    if (!message) {
        throw new Error("Message is undefined or null");
    }
    const hash=CryptoJS.HmacSHA256(message,secretKey)
    const hashInBase64=CryptoJS.enc.Base64.stringify(hash)
    return hashInBase64
};
module.exports = createSignature;

