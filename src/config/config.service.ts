import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export interface TypeOrmConfig {
    // database
    TYPEORM_CONNECTION: "mysql" | "mariadb" | "postgres" | "cockroachdb" | "sqlite" | "mssql" | "oracle" | "cordova" | "nativescript" | "react-native" | "sqljs" | "mongodb" | "expo"
    TYPEORM_HOST?: string
    TYPEORM_DATABASE: string
    TYPEORM_PORT?: number
    TYPEORM_USERNAME?: string
    TYPEORM_PASSWORD?: string
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private config;
  constructor(filePath: string) {
    if(process.env.NODE_ENV == 'production') {
      this.config = process.env;
    } else {
      this.config = dotenv.parse(fs.readFileSync(filePath));
    }
    this.envConfig = this.config; //this.validateInput(config);
  }

  public getTypeOrmConfigs(): TypeOrmConfig {
    return this.config as TypeOrmConfig;
  }

  public getGoogleClientId(): string {
    return String(this.envConfig.GOOGLE_CLIENT_ID);
  }

  public getRedirectUrl(): string {
    return String(this.envConfig.REDIRECT_URL);
  }

  public getCallbackUrl(): string {
    return String(this.envConfig.CALLBACK_URL);
  }

  public getGoogleClientSecret(): string {
    return String(this.envConfig.GOOGLE_CLIENT_SECRET);
  }

  public getJwtSecret(): string {
    return String(this.envConfig.JWT_SECRET);
  }

  public getExpiresIn(): number {
    return Number(this.envConfig.EXPIRES_IN);
  }
  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3000),
      GOOGLE_CLIENT_ID: Joi.string().required(),
      GOOGLE_CLIENT_SECRET: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      EXPIRES_IN: Joi.number().default(3600),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
