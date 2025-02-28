import logger from "../../../config/logger";
import { ProjectEntity } from "../entities/project.entity";
import { InsertCriteria, IProjectGateway, IProjectRepository, ProjectGatewayDependencies } from "../interfaces/project.interfaces";

export class ProjectGateway implements IProjectGateway {
    projectRepository: IProjectRepository;
    logger: typeof logger;
  
    constructor(params: ProjectGatewayDependencies) {
      this.projectRepository = params.repository;
      this.logger = params.logger;
    }
  
    async createProject(project: InsertCriteria): Promise<ProjectEntity> {
      return this.projectRepository.create(project);
    } 
  
    loggerInfo(message: string, data: any) {
      return this.logger.info(message, data);
    };
  }