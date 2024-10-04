import {expect} from 'chai';
import request from 'supertest';
import app from "../src/app";

describe('TodoItemRouter', () => {

    beforeEach(async () => {
        // Reset the todo items before each test
        await request(app).post('/todo/clear');
    })

    describe('POST /', () => {
        it('should add a todo item and return it', async () => {
            const todo = {id: 1, text: 'Test', done: false};
            const response = await request(app).post('/todo').send(todo);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.deep.includes(todo);
        });
    })

    describe('GET /:id', () => {
        it('should return a todo item by id', async () => {
            const todo = {id: 1, text: 'Test', done: false};
            await request(app).post('/todo').send(todo);
            const response = await request(app).get('/todo/1');
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(todo);
        });
    });

    describe('GET /', () => {
        it('should return a list of todo items', async () => {
            const todo = {id: 1, text: 'Test', done: false};
            await request(app).post('/todo').send(todo);
            const response = await request(app).get('/todo');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.deep.includes(todo);
        });
    });

    describe('PUT /:id', () => {
        it('should update a todo item by id', async () => {
            const todo = {id: 1, text: 'Test', done: false};
            await request(app).post('/todo').send(todo);
            const updatedTodo = {id: 1, text: 'Test', done: true};
            const response = await request(app).put('/todo/1').send(updatedTodo);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.deep.includes(updatedTodo);
        });
    });

    describe('DELETE /:id', () => {
        it('should delete a todo item by id', async () => {
            const todo = {id: 1, text: 'Test', done: false};
            await request(app).post('/todo').send(todo);
            const response = await request(app).delete('/todo/1');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.empty;
        });
    });

});