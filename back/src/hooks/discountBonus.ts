import {HookContext} from '@feathersjs/feathers';
import app from '../app';
import carsModel from '../models/cars.model';

export default function () {
    return async (context: HookContext) => {
        const car = await carsModel(app).findOne({query: {autoNumber: context.data.autoNumber}}).exec();

        if (context.data.price < car.bonus) {
            car.bonus = car.bonus - context.data.price;
            context.data.price = 0;
        } else {
            context.data.price = context.data.price - car.bonus;
            car.bonus = 0;
        }

        await context.app.service('cars').patch(null, {
            bonus: car.bonus
        }, {query: {autoNumber: context.data.autoNumber}});
    };
}
