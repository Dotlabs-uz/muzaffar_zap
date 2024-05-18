import mongoose, {Schema} from "mongoose";

const CarsSchema = new Schema({
    autoNumber: {type: String, required: true, maxLength: 8},
    fullName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    type: {type: Number, enum: [0, 1], required: true},
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
});

const Cars = mongoose.model('cars', CarsSchema);

export default Cars;