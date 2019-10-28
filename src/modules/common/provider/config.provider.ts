import { Service } from '../../tokens';
import { Config } from '../model';
import { ConfigService } from './config.service';

export const configProvider = {
  provide: Service.CONFIG,
  useFactory: (): Config => new ConfigService(`${process.env.NODE_ENV || 'development'}.env`).envConfig
};
