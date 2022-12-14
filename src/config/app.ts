import 'dotenv/config';

export const server = {
  port: process.env.PORT,
  host: process.env.HOST
};

export const db = {
  user: process.env.BD_USER,
  password: process.env.BD_PASS,
  tns: process.env.DB_TNS,
  port: process.env.DB_PORT as unknown as number,
  host: process.env.DB_HOST,
  dbName: process.env.DB_NAME
};
