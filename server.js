require("dotenv").config({ path: "./config.env" }); // Load env variables

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// CORS setup
app.use(
  cors({
    origin: "*", // you can restrict to your frontend URL later
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Serve React build folder
app.use(express.static(path.join(__dirname, "build")));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// DB connection
require("./backend/DB/conn");

// Attach IO instance to requests
const attachIoToRequest = () => (req, res, next) => {
  req.io = IO;
  next();
};

// --- Start server ---
// Use HTTP for Render (Render handles HTTPS automatically)
const PORT = process.env.PORT || 9000;
const server = require("http").createServer(app);

// Socket.io
const { Server } = require("socket.io");
const IO = new Server(server, {
  cors: {
    origin: "*", // you can restrict to your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Make IO available in requests
app.use(attachIoToRequest());

// --- API Routes ---
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
app.use(require("./backend/router/Api/Esewa/apiroutes/handleFailure"));
app.use(require("./backend/router/Api/Esewa/apiroutes/handleSuccess"));

// --- Socket APIs ---
const buspending = require("./backend/router/sockets/busPending");
const getBusData = require("./backend/router/sockets/getBusData");
const clearSelectedSeats = require("./backend/router/sockets/clearSelected");

IO.on("connection", (socket) => {
  const userToken = socket.handshake.auth.token;

  socket.on("seat-clicked", async (seatNumber, finalDate, selBus) => {
    const busNo = selBus.busNumber;
    const selectedSeats = await buspending({ seatNumber, finalDate, selBus, userToken });
    socket.to(`${busNo}-${finalDate}`).emit("busSeatSelected", selectedSeats);
  });

  socket.on("clearSelectedSeats", async (finalDate, busNumber) => {
    const clearedSeats = await clearSelectedSeats({ busNumber, userToken, finalDate });
    socket.to(`${busNumber}-${finalDate}`).emit("busSeatsCleared", clearedSeats);
  });

  socket.on("selectBus", async ({ busNumber, finalDate }) => {
    socket.join(`${busNumber}-${finalDate}`);
    const busToSend = await getBusData({ finalDate, busNumber, userToken });
    socket.emit("reciveBus", busToSend);
  });
});

IO.on("connect_error", (err) => {
  console.log("Socket.io connection error:", err.message, err.description, err.context);
});

// --- Start server ---
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
