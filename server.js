const dotenv = require("dotenv"); //always at top
dotenv.config({ path: "./config.env" }); //path to hidden data always at top

const express = require("express");
const app = express();
const path = require("path");

const fs = require("fs");
const https = require("https");
const httpsOptions = {
  key: fs.readFileSync("./cert/sslCert/localhost.decrypted.key"),
  cert: fs.readFileSync("./cert/sslCert/localhost.crt"),
};

const server = https.createServer(httpsOptions, app);
const cookieParser = require("cookie-parser");
const IO=require('socket.io')(server,{
  cors:{
    origin:['https://localhost:9000/bookTickets']
  },
  methods: ["GET", "POST"],
  credentials: true  // Allow credentials (cookies) to be sent
})//creating websocket in sae port as server

app.use(express.json());
app.use(cookieParser());
//variable hidden such as passwords connection

const PORT = process.env.PORT;

//serving the build folder from react app npm run build creates this folder which is copied here ad being served by nodejs
app.use(express.static(path.join(__dirname, "build")));

// the /^\/(?!api).*/ is regex  used in app.get is telling server to let html page handle all routes internally within react app if /* is not equal to /api

app.get(/^\/(?!api).*/, function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

require("./backend/DB/conn"); // adding db connection

//app.use('paths')
app.use(require("./backend/router/Api/userActions/SignUpApi"));
app.use(require("./backend/router/Api/userActions/LoginApi"));
app.use(require("./backend/router/Api/userActions/LogoutApi"))
app.use(require("./backend/router/Api/userActions/ChangePasswordApi"));
app.use(require("./backend/router/Api/userActions/ChangeEmailApi"));

app.use(require("./backend/router/Api/userActions/UserTokenTestApi"));
app.use(require("./backend/router/Api/userActions/UserProfileApi"));
app.use(require("./backend/router/Api/SearchBusesApi"));

// require('./backend/router/Api/userActions/tempAPi')
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (HTTPS)`);
});
IO.on("connection",socket=>{
  console.log(socket.id)
})