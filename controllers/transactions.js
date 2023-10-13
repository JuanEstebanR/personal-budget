import { getUserId } from '../server/budget.js';
import { query, pool } from '../db.js';

export const getEnvelopesByName = async (from, to, userName) => {
    try {
        const obj = {
            from: 0,
            to: 0,
        };
        const userId = await getUserId(userName);
        if (userId[0] === undefined) {
            return res.status(204).send({ message: `User ${req.query.user} not found` });
        }
        const envelopes = await query("SELECT id, name FROM envelopes WHERE iduser = $1 AND name = $2 OR name = $3 ORDER BY 1", [userId[0].id, from, to]);
        console.log(envelopes);
        envelopes.forEach((envelope) => {
            if (envelope.name === from) {
                obj.from = envelope.id;
            } else {
                obj.to = envelope.id;
            }
        });
        return obj
    } catch (error) {
        if (error instanceof TypeError) {
            console.log(error.message);
            res.sendStatus(500);
        }
    }
};
export const createTransaction = async (req, res) => {
    const client = await pool.connect();
    try {
        const { from, to } = await getEnvelopesByName(req.body.from, req.body.to, req.query.user);
        console.log(req.body);
        await client.query('BEGIN');
        const result = await client.query(
            {
                text: "INSERT INTO transactions(amount, date, envelope_from, envelope_to, description) VALUES ($1, CURRENT_TIMESTAMP, $2, $3, $4) RETURNING envelope_from, envelope_to, amount, date",
            },
            [req.body.amount, from, to, req.body.description]);
        console.log(result.rows[0], 'result');
        await client.query(
            {
                text: "UPDATE envelopes SET balance = balance - $1 WHERE id = $2 AND balance >= $1" ,
            },
            [result.rows[0].amount, from]);
        await client.query(
            {
                text: "UPDATE envelopes SET balance = balance + $1 WHERE id = $2",
            },
            [result.rows[0].amount, to]);
            await client.query('COMMIT');
            return res.send(result.rows[0]);
    } catch (e) {
        await client.query('ROLLBACK');
        if (e.code == '23503') {
            console.log(`The envelopes ${req.body.from} or ${req.body.to} do not exist`);
        }
    } finally {
        client.release();
        //return res.send('Transaction created successfully')
    }
};
export const getAllUserTransactions = async (req, res) => {
    try {
        const userId = await getUserId(req.query.user);
        if (userId[0] === undefined) {
            return res.status(204).send({ message: `User ${req.query.user} not found` });
        }
        console.log(userId[0].id);
        const result = await query({ text: "SELECT * FROM transactions" });
        console.log(result);
        return res.send(result);
    } catch (error) {
        if (error instanceof TypeError) {
            console.log(error.message);
            res.sendStatus(500);
        }
    }
};

