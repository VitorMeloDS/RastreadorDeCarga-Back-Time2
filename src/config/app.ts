import 'dotenv/config';

export const server = {
  port: process.env.APP_PORT,
  host: process.env.APP_HOST
};

export const db = {
  user: process.env.BD_USER,
  password: process.env.BD_PASS,
  tns: process.env.DB_TNS
};
