import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Configuration } from '../../../enums/configuration.enum';
import { Environment } from '../../../enums/environment.enum';
import { Config } from '../model';

export class ConfigService {
  public readonly envConfig: Config;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  public get(name: keyof Config): Config[keyof Config] {
    return this.envConfig[name];
  }

  public get isTestEnv(): boolean {
    return this.get(Configuration.Environment) === Environment.Test;
  }

  public get isDevEnv(): boolean {
    return this.get(Configuration.Environment) === Environment.Development;
  }

  public get isProdEnv(): boolean {
    return this.get(Configuration.Environment) === Environment.Production;
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: Record<string, string>): Config {
    const envVarsSchema: Joi.ObjectSchema = Joi.object()
      .unknown()
      .keys({
        NODE_ENV: Joi.string()
          .valid(Environment.Development, Environment.Test, Environment.Production)
          .default(Environment.Development),
        API_PORT: Joi.number().required(),
        API_PREFIX: Joi.string().required(),
        API_CORS: Joi.string().required(),
        SWAGGER_ENABLE: Joi.boolean().required(),
        TYPEORM_CONNECTION: Joi.string().required(),
        TYPEORM_HOST: Joi.string().required(),
        TYPEORM_PORT: Joi.number().required(),
        TYPEORM_USERNAME: Joi.string().required(),
        TYPEORM_PASSWORD: Joi.string().required(),
        TYPEORM_DATABASE: Joi.string().required(),
        TYPEORM_ENTITIES: Joi.string().required(),
        JWT_SECRET: Joi.string().required()
      });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig, {
      allowUnknown: true
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}
