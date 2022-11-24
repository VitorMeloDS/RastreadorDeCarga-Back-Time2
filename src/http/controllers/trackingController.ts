import { Request, Response } from 'express';
import { DBconnection } from '../../database/database';

export class ChargeTracking {
  public async getCharge(req: Request, res: Response) {
    let erro = '';
    const conn = DBconnection.conn();
    let teste: any;

    try {
      teste = await conn.table('tb_carga');

      console.log(teste);
    } catch (e: any) {
      console.log(e);
      erro = e.message;
    }

    return erro ? res.status(500).send(erro) : res.status(200).send({message: 'chegou aqui'});
  }

  public async createCharge(req: Request, res: Response) {
    const conn = DBconnection.conn();
    let erro = '';

    try {
      await conn.table('tb_carga').insert({

      });
    } catch (e: any) {
      console.log(e);
      erro = e.message;
    }

    return erro ? res.status(500).send({ message: erro }) : res.status(201).send({ message: 'Carga cadastrada com sucesso!' });
  }
}
