import request from 'supertest';
import { assert } from 'chai';
import app from '../server.js';


export const user = {
    first_name: 'Julian',
    last_name: 'Gomez',
    user_name: 'JulianGomez',
    budget: '$200.00',
    password: '123456'
}
const envelope = {
    name: 'Food',
    balance: '$200.00'
};

describe('POST /user/login', () => {
    it('should create a new user', async () => {
        const responseUser = {
            first_name: 'Julian',
            last_name: 'Gomez',
            user_name: 'JulianGomez',
            budget: '$200.00'
        }
        const result = await request(app).post('/user/login').send(user);
        assert.deepEqual(result.body, responseUser);
    });

    it('should return a 400 if user already exists and an error creating user message', async () => {
        const response = await request(app).post('/user/login').send(user);
        const message = { message: 'Error creating user' };
        assert.deepEqual(response.body, message);
        assert.equal(response.status, 400);
    })
});

describe('GET /user', () => {
    it('should return a user object', async () => {
        const user_ = {
            first_name: 'Julian',
            last_name: 'Gomez',
            user_name: 'JulianGomez',
            budget: '$200.00'
        }
        const result = await request(app).get(`/user?user=${user.user_name}`);
        assert.deepEqual(result.body, user_);
    });
    it('should return a 404 if user does not exist', async () => {
        const userName = 'JulianGomez1';
        const result = await request(app).get(`/user?user=${userName}`);
        assert.equal(result.status, 404);
    })
});


describe('POST /envelope', () => {
    it('should create a new envelope and response with a json', async () => {
        const response = await request(app).post(`/envelope?user=${user.user_name}`).send(envelope);
        assert.deepEqual(response.body, envelope);
    });

    it('should return a 404 if the user doesnt exists', async () => {
        const userName = 'JulianGomez1';
        const response = await request(app).post(`/envelope?user=${userName}`).send(envelope);
        assert.equal(response.status, 404);
    });

    it('should return a 400 if envelope already exists', async () => {
        const response = await request(app).post(`/envelope?user=${user.user_name}`).send(envelope);
        assert.equal(response.status, 400);
    });
});

describe('DELETE /envelope', () => {
    it('should delete an envelope and response with a json', async () => {
        const response = await request(app).delete(`/envelope?user=${user.user_name}&name=${envelope.name}`);
        assert.deepEqual(response.body, envelope);
    });
});

describe('POST /transaction', () => {
    it('should create a new transaction and response with a json', async () => {
        const transaction = {
            from: 'Food',
            to: 'Rent',
            amount: '100',
            description: 'Food'
        }
        const response = await request(app).post(`/transaction?user=${user.user_name}`).send(transaction);
        assert.deepEqual(response.body, transaction);
    });
});

describe('PUT /user', () => {
    it('should update the user name and response with a json', async () => {
        const newUserName = 'JGomez12';
        const response = await request(app).put(`/user?user=${user.user_name}`).send({user_name: newUserName});
        assert.equal(response.status, 200);
        assert.deepEqual(response.body, {first_name: 'Julian', last_name: 'Gomez', user_name: newUserName});
    });
    it('should return a 404 if user does not exist', async () => {
        const userName = 'JulianGomez1';
        const response = await request(app).put(`/user?user=${userName}`);
        assert.equal(response.status, 404);
    });
});

describe('DELETE /user', () => {
    it('should delete a user and should return a json', async () => {
        const newUserName = 'JGomez12';
        const responseUser = {
            first_name: 'Julian',
            last_name: 'Gomez',
            user_name: 'JGomez12',
        }
        const result = await request(app).delete(`/user?user=${newUserName}`);
        assert.equal(result.status, 200);
        assert.deepEqual(result.body, responseUser);
    });
    it('should return a 404 if user does not exist', async () => {
        const userName = 'JulianGomez1';
        const result = await request(app).delete(`/user?user=${userName}`);
        assert.equal(result.status, 404);
    });
});