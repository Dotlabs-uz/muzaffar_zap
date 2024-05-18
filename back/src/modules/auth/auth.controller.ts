import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify'
import Admins from "../../models/admins.model";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

async function AdminsController(auth: FastifyInstance, opts: any): Promise<void> {
    
    auth.post('/authentication', async (request: FastifyRequest, reply: FastifyReply) => {
        const body: any = request.body;
        const admin: any = await Admins.findOne({login: body.login});
        
        if (!admin?._id) {
            return reply.status(400).send({
                error: 'Bad request error',
                message: 'Invalid login'
            });
        }
        
        const isCorrectPassword = bcrypt.compareSync(body.password, admin?.password);

        if (!isCorrectPassword) {
            return reply.status(400).send({
                error: 'Bad request error',
                message: 'Invalid password'
            });
        }
        
        const secret: any = process.env.JWT_SECRET;
        
        const token = jwt.sign({id: admin._id}, secret);
        
        const {password: removedKey, ...user} = admin._doc;
        
        reply.send({accessToken: token, user: user});
    });
    
}

export default AdminsController;