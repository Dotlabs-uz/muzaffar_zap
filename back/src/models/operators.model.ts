// operators-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import {Application} from '../declarations';
import {Model, Mongoose} from 'mongoose';

export default function (app: Application): Model<any> {
    const modelName = 'operators';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const schema = new mongooseClient.Schema({
        login: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        fullName: {type: String, required: true}
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
