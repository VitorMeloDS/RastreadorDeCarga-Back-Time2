import { Request, Response } from 'express';
import { DBconnection } from '../../database/database';
import { cargoValidator } from '../schemas/cargoSchema';

export class Cargo {
  public async getCharge(req: Request, res: Response) {
    let erro = '';
    const conn = DBconnection.conn();
    let teste: any;

    try {
      teste = await conn.table('tb_carga').select();

      console.log(teste);
    } catch (e: any) {
      console.log(e);
      erro = e.message;
    }

    return erro ? res.status(500).send({ message: erro }) : res.status(200).send(teste);
  }

  public async createCharge(req: Request, res: Response): Promise<object> {
    const conn = DBconnection.conn();
    let code: string;
    let idLocalizacao: any;
    let erro = '';

    try {
      await cargoValidator.validateAsync(req.body).catch((e: any) => {
        console.log(e.details[0].message);
      });
      // code = await this.generateCode();

      // idLocalizacao = await conn.table('tb_localizacao').returning('id_localizacao').insert({
      //   nome_porto: req.body.nome_porto,
      //   origem: req.body.origem,
      //   destino: req.body.destino
      // });

      // if (idLocalizacao) {
      //   await conn.table('tb_carga').insert({
      //     codigo: code,
      //     status: req.body.status,
      //     data_entrega: req.body.data_entrega,
      //     id_localizacao: idLocalizacao.id_localizacao
      //   });
      // }
    } catch (e: any) {
      // console.log(e);
      erro = e.message;
    }

    return erro ? res.status(500).send({ message: erro }) : res.status(201).send({ message: 'Carga cadastrada com sucesso!' });
  }

  private async generateCode(): Promise<any> {
    const conn = DBconnection.conn();
    const code: any[] = [];
    const letter: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
      'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const num: number[] = [0, 1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9];
    let codeDb: any;

    for (let index = 0; index <= 6; index++) {
      if (index < 3) code.push(letter[Math.floor((Math.random() * letter.length))]);
      if (index > 3) code.push(num[Math.floor((Math.random() * num.length))]);
    }

    codeDb = await conn.table('tb_carga').select('codigo').where('codigo', code.join('')).first();

    return codeDb ? this.generateCode() : code.join('');
  }
}
