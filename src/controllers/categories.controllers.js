import connection from "../database.connection/pg.js"
import joi from "joi";
import { stripHtml } from "string-strip-html";

const categorieSchema = joi.object({
	name: joi.string().min(1).required()
});

const getCategories = async (req, res) => {
    try {
        const categories = await connection.query(`SELECT * FROM categories`);
        return res.status(200).send(categories.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const postCategories = async (req, res) => {
    let name = req.body.name

    const validation = categorieSchema.validate({name});

    if (validation.error) {
		const errors = validation.error.details.map((error) => error.message);
		return res.status(400).send(errors);
	} else {
        name = stripHtml(name).result.trim();
    }

    if(name.length === 0 ) {
        return res.sendStatus(400);
    }

    try {
        const categories = await connection.query(`SELECT name FROM categories WHERE name='${name}'`)

        if(categories.rows.length > 0) {
            return res.sendStatus(409);
        }

        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);
        return res.sendStatus(201);

    } catch (error) {
        return res.status(500).send(error.message);
    }

};

export { getCategories, postCategories }