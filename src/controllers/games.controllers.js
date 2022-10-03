import connection from "../database.connection/pg.js"
import joi from "joi";
import { stripHtml } from "string-strip-html";

const gamesSchema = joi.object({
    name: joi.string().min(1).required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().min(1).required().integer(),
    categoryId: joi.number().min(1).required().integer(),
    pricePerDay: joi.number().min(1).required().integer(),
})

const getGames = async (req, res) => {
    const name = req.query.name

    try {
        if(name) {
            const categories = await connection.query(`SELECT * FROM games WHERE name LIKE '%${name}'`);
            return res.status(200).send(categories.rows);
        }

        const categories = await connection.query(`SELECT * FROM games`);
        return res.status(200).send(categories.rows);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const postGames = async (req, res) => {
    const body = req.body
    const validation = gamesSchema.validate(body, {abortEarly: false});

    if(validation.error) {
        const errors = validation.error.details.map((error) => error.message).join(" & ");
		return res.status(400).send(errors);
    } else {
        body.name = stripHtml(body.name).result.trim();
    }

    if(body.name.length === 0 ) {
        return res.sendStatus(400);
    };

    try {
        const categories = await connection.query(`SELECT name FROM categories WHERE name='${body.name}'`)

        if(categories.rows.length > 0) {
            return res.sendStatus(409);
        } 

        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [body.name]);
        return res.sendStatus(201);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export { getGames, postGames };