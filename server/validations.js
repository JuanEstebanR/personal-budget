export const valideInputs = (req, res, next) => {
    const { name, balance} = req.body;
    const userName = req.query.user || 'default';
    if (!name || !Number(balance) || !userName) {
        res.send('Invalid inputs');
    } else {
        req.user = userName;
        req.envelope = req.body;
        next();
    }
}

export const validateWithdrawal = (req, res, next) => {
    const { amount } = req.body;
    if (!Number(amount)) {
        res.send('Invalid input')
    } else {
        req.withdrawalAmount = amount;
        next();
    }
}

export const validateTransfetInputs = (req, res, next) => {
    console.log('Entro a validateTransfetInputs ');
    const { from, to } = req.params;
    const { amount } = req.body;
    if (!from || !to || !Number(amount)) {
        res.send('Invalid inputs')
    }else{
        console.log('Entro a validateTransfetInputs ');
        req.transferFrom = from
        req.transferTo = to
        req.amount = Number(amount);
        next();
    }
    
}
