import connection from "../database.connection/pg.js"
import joi from "joi";

const getCategories = async (req, res) => {
    try {
        const categories = await connection.query(`SELECT * FROM categories`);
        res.status(200).send(categories.rows);
    } catch (error) {
        res.send(error.message);
    }
};

export { getCategories }