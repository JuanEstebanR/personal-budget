import validate from 'validate.js';

export const envelopesValidation = (req, res, next) => {
    const constraints = {
        name: {
            presence: true,
            length: {
                minimum: 2,
                maximum: 25
            }
        },
        balance: {
            presence: true,
            numericality: {
                noStrings: true,
                greaterThan: 0
            }
        },
    }
    const result = validate(req.body, constraints);
    if (result === undefined) {
        next();
    }
    res.send(JSON.stringify(result));
}

export const userDataValidation = (req, res, next) => {
    const constraints = {
        first_name:{
            presence: true,
            length: {
                minimum: 2,
                maximum: 25
            }
        },
        last_name:{
            presence: false,
            length: {
                minimum: 2,
                maximum: 25
            }
        },
        budget:{
            numericality:{
                noStrings: true,
                greaterThan: 0,

            }
        },
        user_name:{
            presence: true,
            type: 'string',
            length:{
                minimum: 2,
                maximum: 25
            }
        }
    };
    const result = validate(req.body, constraints);
    if (result === undefined) {
        console.log('validation passed');
        return next();
    }
    console.log('validation failed');
    res.send(JSON.stringify(result));
}

export const transactionsValidation = (req, res, next) => {
    
}