import { Request, Response, Router } from 'express';
import { getProjectController, deleteProjectController, createProjectController } from '../factories/';
import { authMiddleware } from './../../../middlewares/auth'


const router = Router();


router.post("/", authMiddleware, (request: Request, response: Response) => createProjectController.create(request, response))
router.get("/", authMiddleware, (request: Request, response: Response) => getProjectController.getProjects(request, response))
router.delete("/:id", authMiddleware, (request: Request, response: Response) => deleteProjectController.deleteProject(request, response));


export default router;