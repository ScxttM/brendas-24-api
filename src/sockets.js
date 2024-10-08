import LeaderboardController from "./controllers/leaderboardController.js";

const Sockets = (wss) => {
  const leaderboardController = new LeaderboardController(wss);

  wss.on("connection", (ws) => {
    console.log("A new client connected.");

    // Event listener for incoming messages
    ws.on("message", leaderboardController.emit2All);

    // Event listener for client disconnection
    ws.on("close", () => {
      console.log("A client disconnected.");
    });
  });
};

export default Sockets;
