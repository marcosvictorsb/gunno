import { IPresenter, HttpResponse } from "../../../protocols/";
import { IGetProjectGateway } from "../interfaces/";

export class GetProjectsUseCase {
  constructor(private readonly gateway: IGetProjectGateway, private presenter: IPresenter) {}
    
  async execute(idUser: number): Promise<HttpResponse> {
    try {
      this.gateway.loggerInfo('Getting projects');

      const projects = await this.gateway.getProjects(idUser);
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