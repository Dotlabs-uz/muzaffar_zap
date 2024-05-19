import {Application} from '../declarations';
import admins from './admins/admins.service';
import cars from './cars/cars.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(admins);
    app.configure(cars);
}
