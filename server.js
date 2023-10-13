import express  from 'express';
import morgan  from 'morgan'; 
import bodyparser from 'body-parser';
const app = express();
import envelopesRouter from './routers/envelopes.router.js';
import transactionsRouter from './routers/transactions.router.js';
import userRouter from './routers/users.router.js'


app.use(morgan('dev'));
app.use(bodyparser.json());
app.use('/envelope', envelopesRouter)
app.use('/transaction', transactionsRouter)
app.use('/user', userRouter)

//app.use(require('./public'));

const main = async () => {
    try {
        console.log('Connected to the database');
        const PORT = process.env.PORT || 4001;
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        }) 
    } catch (error) {
        console.log(error);
    }
}

main();

export default app;

