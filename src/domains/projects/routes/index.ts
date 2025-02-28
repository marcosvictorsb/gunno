import { Express, Request, Response, NextFunction, Router } from 'express';
import { projectController } from '../factories/project.factory';


const router = Router();


router.post("/", (request: Request, response: Response) => projectController.create(request, response));
// router.get("/", (request, response) => userController.getUsers(request, response));

export default router;