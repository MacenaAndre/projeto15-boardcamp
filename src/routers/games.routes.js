import express from "express";
import { getGames } from "../controllers/games.controllers.js";

const gamesRouter = express.Router();

gamesRouter.get("/games", getGames);

export { gamesRouter };
