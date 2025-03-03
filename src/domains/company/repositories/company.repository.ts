import { ModelStatic } from 'sequelize';
import { CompanyModel } from '../model/company.model';
import { DeleteCriteria, FindCompanyCriteria, InsertCompany, ICompanyRepository, CompanyRepositoryDependencies, UpdateCriteria } from '../interfaces/company.interface';
import { CompanyEntity } from '../entities/company.entity';

export class CompanyRepository implements ICompanyRepository  {
  protected model: ModelStatic<CompanyModel> ;

  constructor(params: CompanyRepositoryDependencies) {
    this.model = params.model;
  }  

  private getConditions(criteria: FindCompanyCriteria): Record<string, any> {    
    const whereConditions: Record<string, any> = {};

    if (criteria.id) {
      whereConditions['id'] = criteria.id;
    }

    if (criteria.name) {
      whereConditions['name'] = criteria.name;
    }

    if (criteria.domain) {
      whereConditions['domain'] = criteria.domain;
    }
    
    return whereConditions;
  }

  public async create(company: InsertCompany): Promise<CompanyEntity> {
    const createdCompany = await this.model.create(company);
    return new CompanyEntity(
      createdCompany.id,
      createdCompany.uuid,
      createdCompany.name,
      createdCompany.domain,
      createdCompany.created_at,
      createdCompany.updated_at,
    );;
  }

  public async find(criteria: FindCompanyCriteria): Promise<CompanyEntity | null> {
    const company = await this.model.findOne({
      where: this.getConditions(criteria),
      raw: true,
    });

    if (!company) return null;

    return new CompanyEntity(
      company.id,
      company.uuid,
      company.name,
      company.domain,
      company.created_at,
      company.updated_at,
    );
  }

  public async findAll(): Promise<CompanyEntity[]> {
    const companys = await this.model.findAll();
    return companys.map(
      (company: CompanyEntity) =>
        new CompanyEntity(
          company.id,
          company.uuid,
          company.name,
          company.domain,
          company.created_at,
          company.updated_at,
        ),
    );
  }

  public async update(criteria: UpdateCriteria, data: Partial<CompanyEntity>): Promise<CompanyEntity | null> {
    const [affectedRows] = await this.model.update(data, { where: { id: criteria.id } });
    if (affectedRows === 0) return null;

    const updatedCompany = await this.model.findByPk(criteria.id);
    if (!updatedCompany) return null;

    return new CompanyEntity(
      updatedCompany.id,
      updatedCompany.uuid,
      updatedCompany.name,
      updatedCompany.domain,
      updatedCompany.created_at,
      updatedCompany.updated_at,
    );
  }

  public async delete(criteria: DeleteCriteria): Promise<boolean> {
    const affectedRows = await this.model.destroy({ where: { id: criteria.id } });
    return affectedRows > 0;
  }
}
