import express from "express";
import * as bodyParser from "body-parser";

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', routerController);

app.listen(3000, () => {
    console.clear();
    console.log('Server started in localhost:3000🚀');
});
