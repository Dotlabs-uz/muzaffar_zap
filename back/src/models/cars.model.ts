// cars-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import {Application} from '../declarations';
import {Model, Mongoose} from 'mongoose';

export default function (app: Application): Model<any> {
    const modelName = 'cars';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const {Schema} = mongooseClient;
    const schema = new Schema({
        autoNumber: {type: String, required: true, maxLength: 8},
        fullName: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        type: {type: Number, enum: [0, 1, 2], required: true},
        status: {type: Number, enum: [0, 1, 2], required: true},
        boughtInWeek: {type: Number, default: 0},
        priceInWeek: {type: Number, default: 0},
        batteryPercent: {type: Number, required: true},
        balance: {type: Number, default: 0},
        history: {
            type: Array,
            of: {
                volume: {type: Number},
                price: {type: Number},
                lastWeek: {type: Number},
                bonus: {type: Number},
                amount: {type: Number},
                totalAmount: {type: Number}
            }
        }
    }, {
        timestamps: true
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        (mongooseClient as any).deleteModel(modelName);
    }
    return mongooseClient.model<any>(modelName, schema);
}
