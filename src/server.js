import express from "express"
import  cors  from "cors"
import { categoriesRouter } from "./routers/categories.routes.js";
import { gamesRouter } from "./routers/games.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);

app.listen(4000,  () => console.log(`listening on port 4000....`))

