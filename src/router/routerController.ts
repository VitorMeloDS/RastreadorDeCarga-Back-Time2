import { Router, Request, Response } from 'express';
import { ChargeTracking } from '../http/controllers/trackingController';

const route: Router = Router();
const charge: ChargeTracking = new ChargeTracking();

route.get('/tracking', async (req: Request, res: Response) => {
  await charge.getCharge(req, res);
});

export const routerController: Router = route;
