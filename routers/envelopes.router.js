import express from 'express';
const router = express.Router();

import { createEnvelope, getEnvelopes, deleteEnvelope, getEnvelopeByName, getTotaBudget } from '../controllers/envelopes.js';
import { envelopesValidation } from '../utils/validations.js';
router.get('/all', getEnvelopes);
//router.get('/:name', getEnvelopeByName);
router.post('', createEnvelope);
router.delete('', deleteEnvelope);
router.get('/total', getTotaBudget);


export default router;