import {HookContext} from '@feathersjs/feathers';
import {NotAuthenticated} from '@feathersjs/errors';
import {parseJwt} from '../utils/parseJWT';

export default () => {
    return async (context: HookContext) => {
        const data = context.data;

        const cars = await context.app.service('cars').find({query: {autoNumber: data.autoNumber}});

        const history = {
            volume: data.volume,
            price: data.price,
            column: data.column,
            bonusPrice: cars.data[0].bonus + data.history.bonusPrice,
            allVolume: data.history.allVolume,
            bonusPercent: data.history.bonusPercent
        };

        await context.app.service('cars').patch(null, {
            $push: {
                history: history
            }
        }, {query: {autoNumber: data.autoNumber}});


        const auth: any = context.params.authentication;

        if (!auth?.accessToken) {
            throw new NotAuthenticated('Not authorized');
        }

        const payload: any = parseJwt(auth.accessToken);

        let operator: any = {};

        try {
            operator = await context.app.service('operators').get(payload.sub);
        } catch (e) {
            return;
        }

        data.operator = {
            fullName: operator.fullName,
            login: operator.login
        };
    };
}
