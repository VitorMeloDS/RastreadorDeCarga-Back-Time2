import { Request, Response } from 'express';
import { DBconnection } from '../../database/database';
import { cargoValidator } from '../schemas/cargoSchema';

export class CargoController {
  public async getCharge(req: Request, res: Response): Promise<any> {
    const conn = DBconnection.conn();
    let erro = '';
    let cargos: any;

    try {
      if (req.query.codigo) {
        cargos = await conn
          .table('tb_carga as cg')
          .select()
          .where({ cod_carga: req.query.codigo })
          .first();

        await conn
          .table('tb_porto_carga')
          .select()
          .whereIn('id_carga', conn.table('tb_carga').select('id_carga'))
          .then((data: any) => {
            cargos['status'] = data;
            console.log(cargos);
          });
      } else {
        cargos = await conn
          .table('tb_carga')
          .select();
      }

    } catch (e: any) {
      console.log(e);
      erro = e.message;
    }

    return erro ? res.status(500).send({ message: erro }) : res.status(200).send(cargos);
  }

  public async createCharge(req: Request, res: Response): Promise<object> {
    const conn = DBconnection.conn();
    let code: string;
    let erro = '';

    try {
      await cargoValidator.validateAsync(req.body).catch((e: any) => {
        console.log(e);
        throw { message: `'${e.details[0].message.split('"')[1]}' é um campo obrigatório!`};
      });

      code = await this.generateCode();

      await conn.table('tb_carga')
        .returning('id_carga')
        .insert({
          cod_carga: code,
          origem: req.body.origem,
          destino: req.body.destino,
          status: req.body.status,
          data_entrega: req.body.data_entrega
        });

    } catch (e: any) {
      console.log(e);
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

    codeDb = await conn.table('tb_carga').select('cod_carga').where('cod_carga', code.join('')).first();

    return codeDb ? this.generateCode() : code.join('');
  }

  public async patchCargo(req: Request, res: Response) {
    const conn = DBconnection.conn();
    let erro: any;
    let idCarga: any;

    try {

      idCarga = await conn.table('tb_carga').select('id_carga').where({cod_carga: req.body.codigo}).first();
      if (idCarga) {
        await conn.table('tb_porto_carga').returning('id_porto_carga').insert({
          localizacao: req.body.localizacao,
          status: req.body.status,
          id_carga: idCarga.id_carga
        }).catch((e: any) => {
          erro = { message: `Erro ao atualizar localização: ${e.message}`};
        });
      } else {
        erro = { message: `Não existe carga com o código [${req.body.codigo}]`};
      }

      return erro ? res.status(500).send(erro) : res.status(200).send({ message: 'Localização atualizada com sucesso!' });
    } catch (e: any) {
      console.log(e);
    }
  }
}
