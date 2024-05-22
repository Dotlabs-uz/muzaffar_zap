import {HookContext} from '@feathersjs/feathers';

export default function () {
    return async (context: HookContext) => {
        const car = await context.app.service('cars').get(null, {query: {autoNumber: context.data.autoNumber}});

        if (context.data.price < car.bonus) {
            car.bonus = car.bonus - context.data.price;
            context.data.price = 0;
        } else {
            car.bonus = 0;
            context.data.price = context.data.price - car.bonus;
        }

        await context.app.service('cars').patch(null, {
            bonus: car.bonus
        }, {query: {autoNumber: context.data.autoNumber}});
    };
}
