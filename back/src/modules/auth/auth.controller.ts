import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify'
import Admins from "../../models/admins.model";

async function AdminsController(fastify: FastifyInstance, opts: any): Promise<void> {
    
    fastify.post('/authentication', async (request: FastifyRequest, reply: FastifyReply) => {
        const body: any = request.body;
        const admin = await Admins.findOne({login: body.login});
        
        
        reply.send({status: 'ok'})
    });
    
}


export default AdminsController;