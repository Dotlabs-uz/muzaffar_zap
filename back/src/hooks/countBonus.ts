import {HookContext} from '@feathersjs/feathers';
import {BadRequest} from '@feathersjs/errors';

export default function () {
    return async (context: HookContext) => {
        const {data} = context;

        if (!data?.autoNumber || !data?.volume || !data?.price || !data?.column) throw new BadRequest('bad request check all fields');

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const purchases = await context.app.service('purchases').find({
            createdAt: {$gte: sevenDaysAgo}
        });

        const sumVolume = purchases.data.reduce((acc: number, curr: any) => acc + +curr.volume, 0);
        const sumPrice = purchases.data.reduce((acc: number, curr: any) => acc + +curr.price, 0);

        let bonus = 0;

        if (sumVolume <= 200) bonus = 2;
        else if (sumVolume > 200 && sumVolume <= 600) bonus = 3;
        else if (sumVolume > 600) bonus = 5;

        const price = data.price / 100 * bonus;

        await context.app.service('cars').patch(null, {
            $inc: {
                bonus: price
            },
            boughtInWeek: sumPrice,
            boughtInWeekVolume: sumVolume,
        }, {query: {autoNumber: data.autoNumber}});
    };
}
