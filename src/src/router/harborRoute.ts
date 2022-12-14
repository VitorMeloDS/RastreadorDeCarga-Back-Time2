import { HarborController } from './../http/controllers/harborController';
import { Router } from 'express';

const router: Router = Router();

router.get('/portos', async (req, res) => {
  const harbor = new HarborController();
  await harbor.getHarbor(req, res);
});

export const harborRoute: Router = router;
