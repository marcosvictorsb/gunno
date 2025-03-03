import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from './cors';
import routers from './src/infra/routers/';
import {setupRequestLogging} from './src/config/logger'
import { asyncMiddleware } from './src/config/asyncContext';

const app: Express = express();


app.options('*', cors);
app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(asyncMiddleware);
app.use(setupRequestLogging)
  
  

app.use(routers);
export default app;


