import express from "express";
import { getCategories, postCategories } from "../controllers/categories.controllers.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/categories", getCategories);

categoriesRouter.post("/categories", postCategories);

export { categoriesRouter };
