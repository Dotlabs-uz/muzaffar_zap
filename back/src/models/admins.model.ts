import mongoose, {Schema} from "mongoose";
import * as bcrypt from 'bcrypt';

const admins = new Schema({
    login: {type: String, required: true},
    password: {type: String, required: true}
});

admins.pre('save', async function (next) {
    const admin = this;
    
    if (admin?.password) {
        admin.password = await bcrypt.hash(admin.password, 16);
    }

    next();
});

const Admins = mongoose.model('admins', admins);

export default Admins;