import { Express, Request, Response, NextFunction, Router } from 'express';
import { projectController } from '../factories/project.factory';


const router = Router();


router
  .post("/", (request: Request, response: Response) => projectController.create(request, response))
  .get("/", (request: Request, response: Response) => projectController.getProjects(request, response));

export default router;