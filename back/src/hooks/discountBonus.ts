import {HookContext} from '@feathersjs/feathers';
import app from '../app';
import carsModel from '../models/cars.model';

export default function () {
    return async (context: HookContext) => {
        const car = await carsModel(app).findOne({query: {autoNumber: context.data.autoNumber}}).exec();
        const {data} = context;

        const config = await context.app.service('config').find();

        if (context.data.price < car.bonus) {
            car.bonus = car.bonus - context.data.price;
            context.data.price = 0;
        } else {
            context.data.price = context.data.price - car.bonus;
            car.bonus = 0;
        }

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - config.data[0].days);

        const purchases = await context.app.service('purchases').find({
            query: {
                autoNumber: context.data.autoNumber,
                createdAt: {$gte: sevenDaysAgo}
            }
        });

        const sumVolume = purchases.data.reduce((acc: number, curr: any) => acc + +curr.volume, 0);

        const history = {
            volume: data.volume,
            price: data.price,
            column: data.column,
            bonusPrice: car.bonus,
            allVolume: sumVolume + data.volume,
            bonusPercent: car.bonusPercent,
            bonusPricePerPurchase: 0,
            volumePrice: config.data[0].price
        };

        await context.app.service('cars').patch(null, {
            bonus: car.bonus,
            bonusPercent: car.bonusPercent,
            $push: {
                history: history
            }
        }, {query: {autoNumber: context.data.autoNumber}});
    };
}
