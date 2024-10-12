import express, { json } from "express";
import corsMiddleware from "./middlewares/cors.js";
import { WebSocketServer } from "ws";
import Sockets from "./sockets.js";
import "dotenv/config";
import createLeaderboardRouter from "./routes/leaderboardRoutes.js";

const PORT = process.env.PORT || 8080;
const WS_PORT = process.env.WS_PORT || 3000;
const HOST = process.env.HOST || "localhost";

const wss = new WebSocketServer({ host: HOST, port: WS_PORT });
Sockets(wss);

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/leaderboard", createLeaderboardRouter(wss));

app.listen(PORT, HOST, () => {
  console.log(
    `Server is running on port ${PORT}\n\n\thttp://${HOST}:${PORT}\n\n`
  );
});
