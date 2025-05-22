export interface IConfig{

    PORT: number,
    DB_HOST: string | undefined,
    DB_PORT: number | undefined,
    DB_USERNAME: string | undefined, 
    DB_PASSWORD: string | undefined,
    DB_NAME: string | undefined,
    DB_SYNCHRONIZE: boolean| undefined,
    DB_DROP_SCHEMA: boolean| undefined,
    DB_LOGGING: boolean| undefined,
    DB_ENTITIES: string | undefined,

}