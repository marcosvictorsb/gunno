import { Express, Request, Response, NextFunction, Router } from 'express';
import { controllers } from '../factories';


const router = Router();


router.post("/", (request: Request, response: Response) => controllers.user.create(request, response));
router.post("/register", (request: Request, response: Response) => controllers.registerUser.registerUser(request, response));
// router.get("/", (request, response) => userController.getUsers(request, response));

export default router;