import { Router, Request, Response } from 'express';
import { CargoController } from '../http/controllers/cargoController';

const route: Router = Router();
const charge: CargoController = new CargoController();

route.get('/cargos', async (req: Request, res: Response) => {
  await charge.getCharge(req, res);
});

route.post('/cargos', async (req: Request, res: Response) => {
  await charge.createCharge(req, res);
});

export const cargoRoute: Router = route;
