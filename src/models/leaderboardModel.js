import connection from "../database.js";

class LeaderboardModel {
  static async getAll() {
    try {
      const [leaderboard] = await connection.query(
        "SELECT * FROM leaderboard ORDER BY score DESC;"
      );

      return leaderboard;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getPlayerById(id) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM leaderboard WHERE id = ?;",
        [id]
      );

      return result[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async addPlayer(name) {
    try {
      const [result] = await connection.query(
        "INSERT INTO leaderboard (name) VALUES (?);",
        [name]
      );

      const id = result.insertId;
      return this.getPlayerById(id);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async updatePlayer({ id, name }) {
    try {
      const [result] = await connection.query(
        "UPDATE leaderboard SET name = ? WHERE id = ?;",
        [name, id]
      );

      return result.affectedRows === 1;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async deletePlayer(id) {
    try {
      const [result] = await connection.query(
        "DELETE FROM leaderboard WHERE id = ?;",
        [id]
      );

      return result.affectedRows === 1;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async updateScore({ id, score }) {
    try {
      const [result] = await connection.query(
        "UPDATE leaderboard SET score = ? WHERE id = ?;",
        [score, id]
      );

      return result.affectedRows === 1;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default LeaderboardModel;
