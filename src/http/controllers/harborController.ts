import { DBconnection } from './../../database/database';
import { Request, Response } from 'express';

export class HarborController {
  public async getHarbor(req: Request, res: Response): Promise<any> {
    const conn = DBconnection.conn();
    let result: any;
    let erro: any;

    try {
      result = await conn.table('tb_porto').select();
    } catch (e: any) {
      console.log(e);
      erro = e.message;
    }

    return erro ? res.status(500).send(erro) : res.status(200).send(result);
  }
}
