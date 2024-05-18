import mongoose from "mongoose";

async function connect() {
    const MONGO_URI: any = process.env.MONGO_URI;
    
    mongoose.connect(MONGO_URI).catch(err => {
        console.log(err);
        process.exit(1);
    })
}

export default connect;