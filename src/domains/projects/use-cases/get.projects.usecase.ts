import { IPresenter, HttpResponse } from "../../../protocols/";
import { IProjectGateway } from "../interfaces/project.interfaces";

export class GetProjectsUseCase {
  constructor(private readonly gateway: IProjectGateway, private presenter: IPresenter) {}
    
  async execute(): Promise<HttpResponse> {
    try {
      this.gateway.loggerInfo('Getting projects');

      const projects = await this.gateway.getProjects();
      if(!projects) {
        this.gateway.loggerInfo('Erro ao buscar projects');
        return this.presenter.serverError('Erro ao buscar projects');
      }

      return this.presenter.OK(projects);
    }catch(err) {
      this.gateway.loggerInfo('Erro ao buscar projects', { err});
      return this.presenter.serverError('Erro ao buscar projects');
    }    
  }
}