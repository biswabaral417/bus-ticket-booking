const dotenv = require("dotenv"); //always at top
dotenv.config({ path: "./config.env" }); //path to hidden data always at top

const express = require("express");

const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());

const fs = require("fs");
const https = require("https");
// const http=require("http")
const httpsOptions = {
  key: fs.readFileSync("./certs/sslCert/localhost.decrypted.key"),
  cert: fs.readFileSync("./certs/sslCert/localhost.crt"),
};

const server = https.createServer( httpsOptions,app);
const cookieParser = require("cookie-parser");


const IO = require("socket.io")(server, {
  forceNew: true,

  cors: {
    origin: ["http://localhost:3000", "http://localhost:9000", "https://rc-epay.esewa.com.np"],
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies) to be sent
  },
}); //creating websocket in sae port as server





IO.engine.on("connection", (rawSocket) => {
  // if you need the certificate details (it is no longer available once the handshake is completed)
  rawSocket.peerCertificate = rawSocket.request.client.getPeerCertificate();
});




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



/////creating an IO instace for http routes to use the Socket 
const attachIoToRequest = () => (req, res, next) => {
  req.io = IO;
  next();
};

app.use(attachIoToRequest())//use req.id to get id


//app.use('paths')https APIs
app.use(require("./backend/router/Api/userActions/SignUpApi"));
app.use(require("./backend/router/Api/userActions/LoginApi"));
app.use(require("./backend/router/Api/userActions/LogoutApi"));
app.use(require("./backend/router/Api/userActions/ChangePasswordApi"));
app.use(require("./backend/router/Api/userActions/ChangeEmailApi"));

app.use(require("./backend/router/Api/userActions/UserTokenTestApi"));
app.use(require("./backend/router/Api/userActions/UserProfileApi"));
app.use(require("./backend/router/Api/Bookings/SearchBusesApi"));
app.use(require("./backend/router/Api/Bookings/UserTicketsApi"));


app.use(require("./backend/router/Api/Admin/Addbus"));
app.use(require("./backend/router/Api/Admin/Addroutes"));
app.use(require("./backend/router/Api/Admin/modifyBus"));
app.use(require("./backend/router/Api/Admin/GetRoutes"));

app.use(require("./backend/router/Api/Esewa/apiroutes/ApiBooktickets"));
app.use(require('./backend/router/Api/Esewa/apiroutes/handleFailure'))
app.use(require('./backend/router/Api/Esewa/apiroutes/handleSuccess'))

////


///socket APIs
const buspending = require("./backend/router/sockets/busPending");
const getBusData = require("./backend/router/sockets/getBusData");
const clearSelectedSeats = require("./backend/router/sockets/clearSelected");

// require('./backend/router/Api/userActions/tempAPi')

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (HTTPS)`);
});
//sockets
IO.on("connection", (socket) => {

  const userToken = socket.handshake.auth.token;

  socket.on("seat-clicked", async (seatNumber, finalDate, selBus) => {
    const busNo = selBus.busNumber;
    const seaTSelectedtNUM = await buspending({
      seatNumber,
      finalDate,
      selBus,
      userToken,
    });
    socket
      .to(`${busNo}-${finalDate}`)
      .emit("busSeatSelected", seaTSelectedtNUM);
  });
  socket.on("clearSelectedSeats", async (finalDate, busNumber) => {
    const clearedSeats = await clearSelectedSeats({
      busNumber,
      userToken,
      finalDate,
    });
    socket
      .to(`${busNumber}-${finalDate}`)
      .emit("busSeatsCleared", clearedSeats);
  });
  socket.on("selectBus", async ({ busNumber, finalDate }) => {
    socket.join(`${busNumber}-${finalDate}`);
    const busToSend = await getBusData({
      finalDate,
      busNumber: busNumber,
      userToken,
    });
    socket.emit("reciveBus", busToSend);
  });
});


IO.on("connect_error", (err) => {
  // the reason of the error, for example "xhr poll error"
  console.log(err.message);

  // some additional description, for example the status code of the initial HTTP response
  console.log(err.description);

  // some additional context, for example the XMLHttpRequest object
  console.log(err.context);
});

