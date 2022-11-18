import { Router, Request, Response } from 'express';

const route: Router = Router();

route.get('/teste', (req: Request, res: Response) => {
  res.status(200).send({message: 'oi'});
});

export const routerController: Router = route;
