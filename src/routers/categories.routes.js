import express from "express";
import { getCategories } from "../controllers/categories.controllers.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/categories", getCategories);

export { categoriesRouter };
