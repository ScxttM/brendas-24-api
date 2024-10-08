import { Router } from "express";
import LeaderboardController from "../controllers/leaderboardController.js";

const createLeaderboardRouter = (wss) => {
  const leaderboardRouter = Router();

  const leaderboardController = new LeaderboardController(wss);

  leaderboardRouter.get("/", leaderboardController.getAll);
  leaderboardRouter.post("/player", leaderboardController.addPlayer);
  leaderboardRouter.put("/player/:id", leaderboardController.updatePlayer);
  leaderboardRouter.delete("/player/:id", leaderboardController.deletePlayer);
  leaderboardRouter.put("/player/score/:id", leaderboardController.updateScore);

  return leaderboardRouter;
};

export default createLeaderboardRouter;
