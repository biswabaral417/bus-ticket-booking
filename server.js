const dotenv = require("dotenv"); //always at top
dotenv.config({ path: "./config.env" }); //path to hidden data always at top

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());

const fs = require("fs");
const https = require("https");
const httpsOptions = {
  key: fs.readFileSync("./certs/sslCert/localhost.decrypted.key"),
  cert: fs.readFileSync("./certs/sslCert/localhost.crt"),
};

const server = https.createServer(httpsOptions, app);
const cookieParser = require("cookie-parser");
const IO = require("socket.io")(server, {
  forceNew: true,

  cors: {
    origin: ["https://localhost:3000", "https://localhost:9000", "*"],
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

//app.use('paths')https APIs
app.use(require("./backend/router/Api/userActions/SignUpApi"));
app.use(require("./backend/router/Api/userActions/LoginApi"));
app.use(require("./backend/router/Api/userActions/LogoutApi"));
app.use(require("./backend/router/Api/userActions/ChangePasswordApi"));
app.use(require("./backend/router/Api/userActions/ChangeEmailApi"));

app.use(require("./backend/router/Api/userActions/UserTokenTestApi"));
app.use(require("./backend/router/Api/userActions/UserProfileApi"));
app.use(require("./backend/router/Api/Bookings/SearchBusesApi"));
////



///socket APIs
const buspending = require("./backend/router/sockets/busPending");
const getBusData = require("./backend/router/sockets/getBusData");
const clearSelectedSeats = require("./backend/router/sockets/clearSelected");
const BookSelected = require("./backend/router/sockets/BookSelected");

// require('./backend/router/Api/userActions/tempAPi')

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (HTTPS)`);
});

//sockets

IO.on("connection", (socket) => {
  console.log(socket.id);
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
  socket.on("clearSelectedSeats",async (finalDate, busNumber) => {
    const clearedSeats = await clearSelectedSeats({
      busNumber,
      userToken,
      finalDate,
    });
    socket
      .to(`${busNumber}-${finalDate}`)
      .emit("busSeatsCleared", clearedSeats);
  });
  socket.on("bookSelectedSeats",async (finalDate, busNumber) => {
    const bookedSeats =await BookSelected({
      busNumber,
      userToken,
      finalDate,
    });
    //TODO
    //generate ticket wit unpaid status//create sinature wit signaturefn i previouslu used in food sys 5th sem proj
    //create signed form data with sucees url an failure url sent it to fend
    //send form date to frontend
    //initiate payments
    //set if else for payment false and sucess

    socket
      .to(`${busNumber}-${finalDate}`)
      .emit("busSeatsBooked", bookedSeats);
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
