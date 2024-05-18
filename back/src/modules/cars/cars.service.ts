import {FastifyReply} from "fastify";
import Cars from "../../models/cars.model";

export default class CarsService {
    async create(body: any, reply: FastifyReply) {
        try {
            await Cars.create(body);
        } catch (e: any) {
            return reply.send(e);
        }
        
        return reply.send({message: 'car was created successfully'});
    }
    
    async get(query: any, reply: FastifyReply) {
        const page = +query?.page - 1 || 0;
        const limit = 20;
        
        const regex = new RegExp(query.search, 'gi');
        const cars = await Cars.find({
            $or: [
                {number: {$regex: regex}}
            ]
        }).limit(limit).skip(limit * page);
        
        const total = await Cars.countDocuments();
        
        reply.send({
            limit,
            total,
            page: page + 1,
            data: cars
        });
    }
    
    async getCurrent(param: any, reply: FastifyReply) {
        const car = await Cars.findOne(param);
        
        reply.send(car);
    }
    
    async update(param: any, body: any, reply: FastifyReply) {
        try {
            await Cars.updateOne(param, body);
        } catch (e) {
            return reply.send(e);
        }
        
        reply.send({message: 'car was updated successfully'});
    }
    
    async delete(param: any, reply: FastifyReply) {
        try {
            await Cars.deleteOne(param);
        } catch (e) {
            return reply.send(e);
        }
        
        reply.send({message: 'car was deleted successfully'});
    }
}