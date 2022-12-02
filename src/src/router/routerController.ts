import { Router } from 'express';
import { cargoRoute } from './cargoRoute';

const route: Router = Router();

// * Cargo route
route.use(cargoRoute);

export const routerController: Router = route;
