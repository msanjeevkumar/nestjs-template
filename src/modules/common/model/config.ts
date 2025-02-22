import { Environment } from '../../../enums/environment.enum';

export interface Config {
  readonly API_PORT: number;
  readonly NODE_ENV: Environment;
  readonly API_PREFIX: string;
  readonly API_CORS: string;
  readonly SWAGGER_ENABLE: boolean;
  readonly TYPEORM_CONNECTION: string;
  readonly TYPEORM_HOST: string;
  readonly TYPEORM_PORT: number;
  readonly TYPEORM_USERNAME: string;
  readonly TYPEORM_PASSWORD: string;
  readonly TYPEORM_DATABASE: string;
  readonly TYPEORM_ENTITIES: string;
  readonly JWT_SECRET: string;
}
