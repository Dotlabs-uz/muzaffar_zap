import {HookContext} from '@feathersjs/feathers';
import {iff} from 'feathers-hooks-common';
import countBonus from '../../hooks/countBonus';
import * as authentication from '@feathersjs/authentication';
import discountBonus from '../../hooks/discountBonus';
import createReport from '../../hooks/createReport';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = authentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [],
        get: [],
        create: [
            iff((context: HookContext) => context.data.isTaxi && !context.data?.useBonus, countBonus()),
            iff((context: HookContext) => context.data?.useBonus, discountBonus()),
            createReport(),
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
