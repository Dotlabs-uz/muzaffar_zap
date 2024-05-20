import * as authentication from '@feathersjs/authentication';
import {HookContext} from '@feathersjs/feathers';
import carsModel from "../../models/cars.model";
import app from "../../app";
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = authentication.hooks;

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [async (context: HookContext) => {
            const query: any = context.params.query;

            const regex = new RegExp(query.autoNumber, 'gi');
            context.result.data = await carsModel(app).find({
                autoNumber: {
                    $regex: regex
                }
            });
        }],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
