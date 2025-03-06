
import { LoggerMixin } from "../../../services";
import { ProjectEntity } from "../entities/project.entity";
import { InsertCriteria, IGetProjectGateway, IProjectRepository, GetProjectGatewayDependencies } from "../interfaces";

class BaseGateway { constructor(...args: any[]) {} }
const MixedGateway = LoggerMixin(BaseGateway);

export class GetProjectGateway extends MixedGateway implements IGetProjectGateway  {
  projectRepository: IProjectRepository;

  constructor(params: GetProjectGatewayDependencies) {
    super(params);
    this.projectRepository = params.repository;
  } 

  async getProjects(): Promise<ProjectEntity[]> {
    return this.projectRepository.findAll({});
  }
}