import WebSocket from "ws";
import LeaderboardModel from "../models/leaderboardModel.js";
import z from "zod";

const playerSchema = z.object({
  name: z
    .string({
      invalid_type_error: "User name must be a string",
      required_error: "User name is required.",
    })
    .trim(),
});

function validatePlayer(input) {
  return playerSchema.safeParse(input);
}

class LeaderboardController {
  constructor(wss) {
    this.wss = wss;
  }

  getAll = async (req, res) => {
    const leaderboard = await LeaderboardModel.getAll();

    if (!leaderboard) {
      return res.status(500).json({ error: "Error getting leaderboard data" });
    }

    res.json(leaderboard);
  };

  getAllWs = async () => {
    const leaderboard = await LeaderboardModel.getAll();

    if (!leaderboard) {
      console.log("Error getting leaderboard data");
      return { error: "Error getting leaderboard data" };
    }

    const res = { leaderboard };
    return JSON.stringify(res);
  };

  emit2All = () => {
    this.wss.clients.forEach(async (client) => {
      if (client.readyState === WebSocket.OPEN) {
        const leaderboard = await LeaderboardModel.getAll();

        if (!leaderboard) {
          console.log("Error getting leaderboard data");
          return { error: "Error getting leaderboard data" };
        }

        const res = { leaderboard };
        client.send(JSON.stringify(res));
      }
    });
  };

  addPlayer = async (req, res) => {
    const validation = validatePlayer(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error });
    }

    const { name } = validation.data;

    const player = await LeaderboardModel.addPlayer(name);

    if (!player) {
      return res.status(500).json({ error: "Error creating player" });
    }

    this.emit2All();

    res.json({ meesage: "Player created", player });
  };

  updatePlayer = async (req, res) => {
    const validation = validatePlayer(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error });
    }

    const { id } = req.params;
    const { name } = validation.data;

    const existingPlayer = await LeaderboardModel.getPlayerById(id);

    if (!existingPlayer) {
      return res.status(500).json({ error: "Player not found", id });
    }

    const result = await LeaderboardModel.updatePlayer({ id, name });

    if (!result) {
      return res.status(500).json({ error: "Error updating player" });
    }

    this.emit2All();

    res.json({ meesage: "Player created" });
  };

  deletePlayer = async (req, res) => {
    const { id } = req.params;

    const existingPlayer = await LeaderboardModel.getPlayerById(id);

    if (!existingPlayer) {
      return res.status(500).json({ error: "Player not found", id });
    }

    const result = await LeaderboardModel.deletePlayer({ id, name });

    if (!result) {
      return res.status(500).json({ error: "Error deleting player" });
    }

    this.emit2All();

    res.json({ meesage: "Player deleted", id });
  };

  updateScore = async (req, res) => {
    let { score } = req.body;

    if (!Number.isInteger(score)) {
      return res.status(400).json({
        error: "Score must be an int number",
      });
    }

    if (score < 0) {
      return res.status(400).json({
        error: "Score must be an number greater or equal than 0",
      });
    }

    const { id } = req.params;
    const player = await LeaderboardModel.updateScore({ id, score });

    if (!player) {
      return res.status(500).json({ error: "Error updating player score" });
    }

    this.emit2All();

    res.json({ meesage: "Score updated", id });
  };
}

export default LeaderboardController;
