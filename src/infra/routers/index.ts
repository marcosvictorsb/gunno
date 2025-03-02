import { Router } from "express";
import healthRoutes from "../../domains/health/routes";
import authenticationRoutes from "../../domains/authentication1/routes"
import userRoutes from "../../domains/user/routes"
import projectRoutes from "../../domains/projects/routes"

const router = Router();

// Prefixo para todas as rotas
router.use("/health", healthRoutes);
router.use("/auth", authenticationRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);

export default router;
 
