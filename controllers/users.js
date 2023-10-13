import { query } from '../db.js';
import { getUserId } from '../server/budget.js';

export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, budget, user_name, password } = req.body;
        const result = await query({
            text: 'INSERT INTO users(first_name, last_name, budget, user_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING first_name, last_name, budget, user_name', 
            values: [first_name, last_name, budget, user_name, password]
        });
        return res.status(201).json(result[0]);
    } catch (error) {
        if (error instanceof Error) {
            //console.log(error.message);
            res.status(400).send({message: 'Error creating user'})
        }
    }
};

export const getUser = async (req, res) => {
    try {
        //const user = await getUserId(req.query.user);
        const result = await query('SELECT first_name, last_name, user_name, budget FROM users WHERE user_name = $1', [req.query.user]);
        if (result.length === 0) {
            return res.status(404).send({message: 'User not found'});
        }
        return res.status(200).json(result[0]);
    } catch (error) {
        if (error instanceof Error) {
            //console.log(error.message);
            res.status(404).send({message: 'Error getting user'})
        }
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await getUserId(req.query.user);
        const result = await query('DELETE FROM users WHERE id = $1 RETURNING first_name, last_name, user_name', [user[0].id]);
        return res.json(result[0]);
    } catch (error) {
        if (error instanceof Error) {
            //console.log(error.message);
            res.status(404).send({message: 'Error deleting user'})
        }
    }
};

export const updateUserName = async (req, res) => {
    try {
        const user = await getUserId(req.query.user);
        if (user.length === 0) {
            console.log('User not found');
            return res.status(404).send({message: 'User not found'});
        }
        const { user_name } = req.body;
        const result = await query({text: 'UPDATE users SET user_name = $1 WHERE id = $2 RETURNING first_name, last_name, user_name'}, [user_name, user[0].id]);
        return res.json(result[0]);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.send({message: 'Error updating user'})
        }
    }
};