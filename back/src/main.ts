import fastify from "fastify";
import connect from "./mongoose";
import fastifyEnv from '@fastify/env';
import AdminsController from "./modules/auth/auth.controller";

const app = fastify({logger: true});

const schema = {
    type: 'object',
    required: ['PORT', 'MONGO_URI'],
    properties: {
        PORT: {
            type: 'string'
        },
        MONGO_URI: {
            type: 'string'
        }
    }
}

const options = {
    confKey: 'config',
    schema,
    dotenv: true,
    data: process.env
}

async function setup() {
    app.register(fastifyEnv, options)
    await app.after()
    
    await connect();
    app.register(AdminsController);
    await app.ready()
    const PORT: any = process.env.PORT;
    
    app.listen({port: PORT}, (err) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at http://localhost:3030`)
    })
}

setup();

export default app;