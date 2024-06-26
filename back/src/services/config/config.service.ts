// Initializes the `config` service on path `/config`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Config } from './config.class';
import createModel from '../../models/config.model';
import hooks from './config.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'config': Config & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/config', new Config(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('config');

  service.hooks(hooks);
}
