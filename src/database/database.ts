import { Knex } from 'knex';
import kenx from 'knex';
import { db } from '../config/app';

export class DBconnection {
  private static connection: Knex;

  static conn () {
    if (DBconnection.connection) return DBconnection.connection;
    console.log(`conectando a ${db.tns}`);

    DBconnection.connection = kenx({
      client: 'pg',
      connection: {
        user: db.user,
        password: db.password,
        connectString: db.tns,
        requestTimeout: 3000,
        connectionTimeout: 3000
      },
      pool: {
        min: 0,
        max: 4
      }
    });

    return DBconnection.connection;
  }
}