import { Router } from 'express';
import { cargoRoute } from './cargoRoute';
import { harborRoute } from './harborRoute';

const route: Router = Router();

// * Cargo route
route.use(cargoRoute);

// * Harbor route
route.use(harborRoute);

export const routerController: Router = route;
