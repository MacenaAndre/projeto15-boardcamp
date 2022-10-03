import express from "express";
import { getGames, postGames } from "../controllers/games.controllers.js";

const gamesRouter = express.Router();

gamesRouter.get("/games", getGames);

gamesRouter.post("/games", postGames);

export { gamesRouter };
