import express from 'express';
import * as bodyParser from 'body-parser';
import { routerController } from './router/routerControl';
import { server } from './config/app';
import cors from 'cors';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/api', routerController);

app.listen(server.port || 3000, () => {
  console.clear();
  console.log(`Server started in ${server.host}:${server.port || 3030}🚀`);
});
