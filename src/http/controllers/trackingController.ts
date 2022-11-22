import { Request, Response } from 'express';

export class ChargeTracking {
  public async getCharge(req: Request, res: Response) {
    let erro: string = ''
    try {
      console.log(req);
    } catch (e: any) {
      console.log(e);
      erro = e.message;
    }

    return erro ? res.status(500).send(erro) : res.status(200).send({message: 'chegou aqui'})
  }
}