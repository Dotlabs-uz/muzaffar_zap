import {HookContext} from '@feathersjs/feathers';
import {iff} from 'feathers-hooks-common';
import countBonus from '../../hooks/countBonus';
import * as authentication from '@feathersjs/authentication';
import discountBonus from "../../hooks/discountBonus";
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = authentication.hooks;

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            iff((context: HookContext) => context.data.isTaxi && !context.data?.useBonus, countBonus()),
            iff((context: HookContext) => context.data.useBonus, discountBonus()),
            async (context: HookContext) => {
                const data = context.data;
                const history = {
                    volume: data.volume,
                    price: data.price,
                    column: data.column
                };

                await context.app.service('cars').patch(null, {
                    $push: {
                        history: history
                    }
                }, {query: {autoNumber: data.autoNumber}});
            }
        ],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [],
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
