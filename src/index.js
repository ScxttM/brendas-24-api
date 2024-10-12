import express, { json } from "express";
import corsMiddleware from "./middlewares/cors.js";
import { WebSocketServer } from "ws";
import Sockets from "./sockets.js";
import "dotenv/config";
import createLeaderboardRouter from "./routes/leaderboardRoutes.js";

const PORT = process.env.PORT || 8080;
const WS_PORT = process.env.WS_PORT || 3000;
const IP_ADRESS = "192.168.1.218";

const wss = new WebSocketServer({ host: IP_ADRESS, port: WS_PORT });
Sockets(wss);

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/leaderboard", createLeaderboardRouter(wss));

app.listen(PORT, IP_ADRESS, () => {
  console.log(
    `Server is running on port ${PORT}\n\n\thttp://${IP_ADRESS}:${PORT}\n\n`
  );
});
