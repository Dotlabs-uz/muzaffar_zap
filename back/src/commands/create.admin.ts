import inquirer from "inquirer";
import Admins from "../models/admins.model";
import connect from "../mongoose";
import dotenv from "dotenv";

dotenv.config();

(async function createAdmin() {
    await connect();
    
    const admin = {password: '', login: ''};
    
    const {login}: any = await inquirer.prompt({name: 'login', message: 'login: '});
    
    if (login.length < 8) {
        return console.log('login should be at least 8 char.');
    }
    
    admin.login = login;
    
    const {password}: any = await inquirer.prompt({name: 'password', message: 'password: ', type: "password"});
    
    if (password.length < 8) {
        return console.log('password should be at least 8 char.');
    }
    
    admin.password = password;
    
    try {
        await Admins.create(admin);
        console.log('admin created successfully');
    } catch (e) {
        console.log(e);
    }
    
    process.exit(1);
})();