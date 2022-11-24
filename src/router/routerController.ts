import { Router, Request, Response } from 'express';
import { Cargo } from '../http/controllers/cargoController';

const route: Router = Router();
const charge: Cargo = new Cargo();

route.get('/cargo', async (req: Request, res: Response) => {
  await charge.getCharge(req, res);
});

route.post('/cargo', async (req: Request, res: Response) => {
  await charge.createCharge(req, res);
});

export const routerController: Router = route;
