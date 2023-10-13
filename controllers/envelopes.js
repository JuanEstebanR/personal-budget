import { query } from "../db.js";
import { getUserId } from "../server/budget.js";

export const getEnvelopeByName = async (userName, envelopeName) => {
    try {
        const userId = await getUserId(userName);
        const envelope = await query("SELECT id, name, balance FROM envelopes WHERE iduser = $1 AND name = $2", [userId[0].id, envelopeName]);
        return envelope[0];
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}
export const getEnvelopes = async (req, res) => {
    try {
        const userName = req.query.user;
        const userId = await getUserId(userName);
        const envelopes = await query("SELECT name, balance FROM envelopes WHERE iduser = $1", [userId[0].id]);
        return res.status(200).json(envelopes);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.send(500);
        }
    }
}
export const createEnvelope = async (req, res) => {
    try {
        const { name, balance } = req.body;
        const userName = req.query.user;
        const userId = await getUserId(userName);
        if (userId.length === 0) {
            console.log('1');
            return res.sendStatus(404);
        }
        const envelope = await query("INSERT INTO envelopes (name, balance, iduser) VALUES ($1, $2, $3) RETURNING name, balance", [name, balance, userId[0].id]);
        return res.status(201).json(envelope[0]);
    } catch (error) {
        if (error instanceof Error) {
                if (error.code === '23505') {
                    console.log('2');
                    return res.status(404).json({ message: 'Envelope already exists' });
                }
            }
    }
}

export const deleteEnvelope = async (req, res) => {
    try {
        const envelope = await getEnvelopeByName(req.query.user, req.query.name);
        const result = await query("DELETE FROM envelopes WHERE id = $1 RETURNING name, balance", [envelope.id]);
        return res.status(200).json(result[0]);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.send(500);
        }
    }
};

export const getTotaBudget = async (req, res) => {
    try {
        const userName = req.query.user;
        const userId = await getUserId(userName);
        const totalBudget = await query("SELECT COALESCE(SUM(balance),CAST(0 AS MONEY)) AS total_budget FROM envelopes WHERE idUser = $1", [userId[0].id]);
        return res.status(200).json(totalBudget[0]);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.send(500);
        }
    }
}