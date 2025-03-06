
import { LoggerMixin } from "../../../services";
import { ProjectEntity } from "../entities/project.entity";
import { InsertCriteria, IDeleteProjectGateway, IProjectRepository, DeleteProjectGatewayDependencies } from "../interfaces";

class BaseGateway { constructor(...args: any[]) {} }
const MixedGateway = LoggerMixin(BaseGateway);

export class DeleteProjectGateway extends MixedGateway implements IDeleteProjectGateway  {
  projectRepository: IProjectRepository;

  constructor(params: DeleteProjectGatewayDependencies) {
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