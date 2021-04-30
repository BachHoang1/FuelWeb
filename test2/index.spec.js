const { expect } = require('chai');
const request = require('supertest');
const app = require('../routes/clients');

describe('Test path', () =>
{
    test('It should', done =>{
        request(app)
        .get('/')
        .then(response  =>{
            expect(response.render(message).toBe(message));
            done();
        })
    })
})