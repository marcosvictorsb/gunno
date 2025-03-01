
import { LoggerService } from "../../../services/logger.services";
import { ProjectEntity } from "../entities/project.entity";
import { InsertCriteria, IProjectGateway, IProjectRepository, ProjectGatewayDependencies } from "../interfaces/project.interfaces";


export class ProjectGateway extends LoggerService implements IProjectGateway  {
  projectRepository: IProjectRepository;

  constructor(params: ProjectGatewayDependencies) {
    super(params);
    this.projectRepository = params.repository;
  }  

  async createProject(project: InsertCriteria): Promise<ProjectEntity> {
    return this.projectRepository.create(project);
  } 

  async getProjects(): Promise<ProjectEntity[]> {
    return this.projectRepository.findAll({});
  } 

  async deleteProject(id: number): Promise<boolean> {
    return this.projectRepository.delete(id);
  }
}