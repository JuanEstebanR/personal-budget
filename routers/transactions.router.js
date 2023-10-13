import express from 'express';
const router = express.Router();
import { getAllUserTransactions, getEnvelopesByName, createTransaction} from '../controllers/transactions.js';

router.get('', getAllUserTransactions);
router.post('', createTransaction);


export default router;