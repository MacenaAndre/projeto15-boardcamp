import connection from "../database.connection/pg.js"

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

export { getGames };