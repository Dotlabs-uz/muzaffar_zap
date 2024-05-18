import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import CarsService from "./cars.service";

export default async function (fastify: FastifyInstance) {
    const carsService = new CarsService();
    
    fastify.get('/cars', async (request: FastifyRequest, reply: FastifyReply) => {
        await carsService.get(request.query, reply);
    });
    
    fastify.get('/cars/:_id', async (request: FastifyRequest, reply: FastifyReply) => {
        await carsService.getCurrent(request.params, reply);
    });
    
    fastify.post('/cars', async (request: FastifyRequest, reply: FastifyReply) => {
        await carsService.create(request.body, reply);
    });
    
    fastify.patch('/cars/:_id', async (request: FastifyRequest, reply: FastifyReply) => {
        await carsService.update(request.params, request.body, reply);
    });
    
    fastify.delete('/cars/:_id', async (request: FastifyRequest, reply: FastifyReply) => {
        const res = await carsService.delete(request.params, reply);
    });
}