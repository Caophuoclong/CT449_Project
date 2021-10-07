const request = require('supertest');
const server = require('../server');
jest.mock("../server");
jest.setTimeout(30000)
describe('Auth', () => {
    jest.useFakeTimers();
    it("/auth/register should return 200 and message when it true", async ()=>{
        request(server)
            .post('/auth/register')
            .send({
                username: 'test',
                password: 'test',
                email:"caophuoclong1@gmail.com",
            })
            .expect(200)
            .then(res => {
                expect(res.body.message).toBe("Please return sign in page!");
            });
    })
    it("/auth/register shoud return 403 and message is 'User already exists!'",()=>{
        request(server)
        .post('/auth/register')
        .send({
            username: 'already',
            password: 'test',
            email:"caophuoclong1@gmail.com"
        })
        .then(res => {
            expect(res.message).toBe("User already exists!");
            expect(res.status).toBe(403);
        });
    })
})
