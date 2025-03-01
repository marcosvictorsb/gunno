#!/bin/bash

# Função para capitalizar a primeira letra de uma string
capitalize_first_letter() {
    echo "$1" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}'
}

# Função para deixar a primeira letra de uma string minúscula
lowercase_first_letter() {
    echo "$1" | awk '{print tolower(substr($0,1,1)) substr($0,2)}'
}

# Função para converter o nome do domínio para singular (simplificado)
to_singular() {
    if [[ "$1" == *s ]]; then
        echo "${1%s}"
    else
        echo "$1"
    fi
}

# Função para criar o template do model
create_model_template() {
    local domain_name_singular="$1"
    local domain_name_plural="$2"
    local capitalized_domain_name_singular=$(capitalize_first_letter "$domain_name_singular")

    echo "import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import mysql from '../../../infra/database/connection/mysql';

class ${capitalized_domain_name_singular}Model extends Model {
  id!: number;
  uuid!: string;
  created_at!: Date;
  updated_at!: Date;
}

${capitalized_domain_name_singular}Model.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: mysql,
    tableName: '${domain_name_plural}',
    timestamps: true,
    underscored: true,
  }
);

export { ${capitalized_domain_name_singular}Model };"
}

# Função para criar o template da entidade
create_entity_template() {
    local domain_name_singular="$1"
    local capitalized_domain_name_singular=$(capitalize_first_letter "$domain_name_singular")

    echo "export class ${capitalized_domain_name_singular}Entity {
    constructor(
      public readonly id: number,
      public readonly created_at: Date,
      public readonly updated_at: Date,
    ) {}
  }"
}

# Função para criar o template da interface
create_interface_template() {
    local domain_name_singular="$1"
    local capitalized_domain_name_singular=$(capitalize_first_letter "$domain_name_singular")
    local lowercase_domain_name_singular=$(lowercase_first_letter "$domain_name_singular")

    echo "import { ModelStatic } from 'sequelize';
import { ${capitalized_domain_name_singular}Entity } from '../entities/${lowercase_domain_name_singular}.entity';
import ${capitalized_domain_name_singular}Model from '../model/${lowercase_domain_name_singular}.model';
import { HttpResponse } from '../../../protocols/presenter';
import logger from '../../../config/logger';
import { ILoggerService } from '../../../services/logger.services';

export type ${capitalized_domain_name_singular}Input = {
  
}

export type InsertCriteria = {
  
}

export type FindCriteria = {
  id?: number,
}

export type UpdateCriteria = {
  id: number
}

export type DeleteCriteria = {
  id: number
}

export type ${capitalized_domain_name_singular}RepositoryDependencies = {
  model: ModelStatic<${capitalized_domain_name_singular}Model>
}

export type ${capitalized_domain_name_singular}UseCases = {
  create${capitalized_domain_name_singular}: { execute(${lowercase_domain_name_singular}: InsertCriteria): Promise<HttpResponse> },
}

export type ${capitalized_domain_name_singular}ControllerDependencies = {
  useCases: ${capitalized_domain_name_singular}UseCases
}

export type ${capitalized_domain_name_singular}GatewayDependencies = {
  repository: I${capitalized_domain_name_singular}Repository;
  logger: typeof logger
}

export interface I${capitalized_domain_name_singular}Gateway extends ILoggerService {
  create${capitalized_domain_name_singular}(${lowercase_domain_name_singular}: InsertCriteria): Promise<${capitalized_domain_name_singular}Entity>;
}

export interface I${capitalized_domain_name_singular}Repository {
  create(criteria: InsertCriteria): Promise<${capitalized_domain_name_singular}Entity>;
  find(criteria: FindCriteria): Promise<${capitalized_domain_name_singular}Entity | null>;
  findAll(criteria: FindCriteria): Promise<${capitalized_domain_name_singular}Entity[]>;
  update(criteria: UpdateCriteria, data: Partial<${capitalized_domain_name_singular}Entity>): Promise<${capitalized_domain_name_singular}Entity | null>;
  delete(criteria: DeleteCriteria): Promise<boolean>;
}"
}

# Função para criar o template do repositório
create_repository_template() {
    local domain_name_singular="$1"
    local capitalized_domain_name_singular=$(capitalize_first_letter "$domain_name_singular")
    local lowercase_domain_name_singular=$(lowercase_first_letter "$domain_name_singular")

    echo "import { ModelStatic } from 'sequelize';
import { ${capitalized_domain_name_singular}Model } from '../model/${lowercase_domain_name_singular}.model';
import { DeleteCriteria, FindCriteria, InsertCriteria, I${capitalized_domain_name_singular}Repository, ${capitalized_domain_name_singular}RepositoryDependencies, UpdateCriteria } from '../interfaces/${lowercase_domain_name_singular}.interface';
import { ${capitalized_domain_name_singular}Entity } from '../entities/${lowercase_domain_name_singular}.entity';

export class ${capitalized_domain_name_singular}Repository implements I${capitalized_domain_name_singular}Repository  {
  protected model: ModelStatic<${capitalized_domain_name_singular}Model> ;

  constructor(params: ${capitalized_domain_name_singular}RepositoryDependencies) {
    this.model = params.model;
  }  

  private getConditions(criteria: FindCriteria): Record<string, any> {    
    const whereConditions: Record<string, any> = {};

    if (criteria.id) {
      whereConditions['id'] = criteria.id;
    }
    
    return whereConditions;
  }

  public async create(${lowercase_domain_name_singular}: InsertCriteria): Promise<${capitalized_domain_name_singular}Entity> {
    const created${capitalized_domain_name_singular} = await this.model.create(${lowercase_domain_name_singular});
    return new ${capitalized_domain_name_singular}Entity(
      created${capitalized_domain_name_singular}.id,
      created${capitalized_domain_name_singular}.created_at,
      created${capitalized_domain_name_singular}.updated_at,
    );;
  }

  public async find(criteria: FindCriteria): Promise<${capitalized_domain_name_singular}Entity | null> {
    const ${lowercase_domain_name_singular} = await this.model.findOne({
      where: this.getConditions(criteria),
      raw: true,
    });

    if (!${lowercase_domain_name_singular}) return null;

    return new ${capitalized_domain_name_singular}Entity(
      ${lowercase_domain_name_singular}.id,
      ${lowercase_domain_name_singular}.created_at,
      ${lowercase_domain_name_singular}.updated_at,
    );
  }

  public async findAll(): Promise<${capitalized_domain_name_singular}Entity[]> {
    const ${lowercase_domain_name_singular}s = await this.model.findAll();
    return ${lowercase_domain_name_singular}s.map(
      (${lowercase_domain_name_singular}: ${capitalized_domain_name_singular}Entity) =>
        new ${capitalized_domain_name_singular}Entity(
           ${lowercase_domain_name_singular}.id,
           ${lowercase_domain_name_singular}.created_at,
           ${lowercase_domain_name_singular}.updated_at,
        ),
    );
  }

  public async update(criteria: UpdateCriteria, data: Partial<${capitalized_domain_name_singular}Entity>): Promise<${capitalized_domain_name_singular}Entity | null> {
    const [affectedRows] = await this.model.update(data, { where: { id: criteria.id } });
    if (affectedRows === 0) return null;

    const updated${capitalized_domain_name_singular} = await this.model.findByPk(criteria.id);
    if (!updated${capitalized_domain_name_singular}) return null;

    return new ${capitalized_domain_name_singular}Entity(
      updated${capitalized_domain_name_singular}.id,
      updated${capitalized_domain_name_singular}.created_at,
      updated${capitalized_domain_name_singular}.updated_at,
    );
  }

  public async delete(criteria: DeleteCriteria): Promise<boolean> {
    const affectedRows = await this.model.destroy({ where: { id: criteria.id } });
    return affectedRows > 0;
  }
}"
}

# Função para criar o template do gateway
create_gateway_template() {
    local domain_name_singular="$1"
    local capitalized_domain_name_singular=$(capitalize_first_letter "$domain_name_singular")
    local lowercase_domain_name_singular=$(lowercase_first_letter "$domain_name_singular")

    echo "import { LoggerService } from '../../../services/logger.services';
import { ${capitalized_domain_name_singular}Entity } from '../entities/${lowercase_domain_name_singular}.entity';
import { InsertCriteria, I${capitalized_domain_name_singular}Gateway, I${capitalized_domain_name_singular}Repository, ${capitalized_domain_name_singular}GatewayDependencies } from '../interfaces/${lowercase_domain_name_singular}.interface';

export class ${capitalized_domain_name_singular}Gateway extends LoggerService implements I${capitalized_domain_name_singular}Gateway  {
  ${lowercase_domain_name_singular}Repository: I${capitalized_domain_name_singular}Repository;

  constructor(params: ${capitalized_domain_name_singular}GatewayDependencies) {
    super(params);
    this.${lowercase_domain_name_singular}Repository = params.repository;
  }

  async create${capitalized_domain_name_singular}(${lowercase_domain_name_singular}: InsertCriteria): Promise<${capitalized_domain_name_singular}Entity> {
    return this.${lowercase_domain_name_singular}Repository.create(${lowercase_domain_name_singular});
  } 
}"
}

# Função para criar o template do controller
create_controller_template() {
    local domain_name_singular="$1"
    local capitalized_domain_name_singular=$(capitalize_first_letter "$domain_name_singular")
    local lowercase_domain_name_singular=$(lowercase_first_letter "$domain_name_singular")

    echo "import { Request, Response } from 'express';
import { ${capitalized_domain_name_singular}ControllerDependencies, ${capitalized_domain_name_singular}UseCases } from '../interfaces/${lowercase_domain_name_singular}.interface';

export class ${capitalized_domain_name_singular}Controller {
  private useCases: ${capitalized_domain_name_singular}UseCases;

  constructor(params: ${capitalized_domain_name_singular}ControllerDependencies){
    this.useCases = params.useCases;
  }
  
  public async create(request: Request, response: Response): Promise<Response> {  
    const { name, description } = request.body; 
    const result = await this.useCases.create${capitalized_domain_name_singular}.execute({ name, description } );
    return response.status(result.status).json(result.body);   
  }
}"
}

# Função para criar o template do use-case
create_use_case_template() {
    local domain_name_singular="$1"
    local capitalized_domain_name_singular=$(capitalize_first_letter "$domain_name_singular")
    local lowercase_domain_name_singular=$(lowercase_first_letter "$domain_name_singular")

    echo "import { InsertCriteria, I${capitalized_domain_name_singular}Gateway, ${capitalized_domain_name_singular}Input } from '../interfaces/${lowercase_domain_name_singular}.interface';
import { IPresenter } from '../../../protocols/presenter';
import { HttpResponse } from '../../../protocols/http';

export class Create${capitalized_domain_name_singular}UseCase {
  constructor(private readonly gateway: I${capitalized_domain_name_singular}Gateway, private presenter: IPresenter) {}

  async execute(input: ${capitalized_domain_name_singular}Input): Promise<HttpResponse> {
    this.gateway.loggerInfo('Creating ${lowercase_domain_name_singular}', { input });

    const payload: InsertCriteria = {
    }
    const ${lowercase_domain_name_singular}Created = await this.gateway.create${capitalized_domain_name_singular}(payload);
    if(!${lowercase_domain_name_singular}Created) {
      this.gateway.loggerInfo('Erro ao criar ${lowercase_domain_name_singular}');
      return this.presenter.serverError('Erro ao criar ${lowercase_domain_name_singular}');
    }

    return this.presenter.OK();
  }
}"
}

# Função para criar o template da factory
create_factory_template() {
    local domain_name_singular="$1"
    local capitalized_domain_name_singular=$(capitalize_first_letter "$domain_name_singular")
    local lowercase_domain_name_singular=$(lowercase_first_letter "$domain_name_singular")

    echo "import logger from '../../../config/logger';
import { ${capitalized_domain_name_singular}Repository } from '../repositories/${lowercase_domain_name_singular}.repository';
import { Create${capitalized_domain_name_singular}UseCase } from '../use-cases/create.${lowercase_domain_name_singular}.usecase';
import { ${capitalized_domain_name_singular}Model }from '../model/${lowercase_domain_name_singular}.model';
import { ${capitalized_domain_name_singular}GatewayDependencies, ${capitalized_domain_name_singular}UseCases } from '../interfaces/${lowercase_domain_name_singular}.interface';
import { ${capitalized_domain_name_singular}Controller } from '../controllers/${lowercase_domain_name_singular}.controller';
import { Presenter } from '../../../protocols/presenter';
import { ${capitalized_domain_name_singular}Gateway } from '../gateways/${lowercase_domain_name_singular}.gateway';

// Configuração do repositório
const ${lowercase_domain_name_singular}Repository = new ${capitalized_domain_name_singular}Repository({ model: ${capitalized_domain_name_singular}Model });

// Configuração dos adapters


// Configuração do gateway
const gateway: ${capitalized_domain_name_singular}GatewayDependencies = {
  repository: ${lowercase_domain_name_singular}Repository,
  logger
}

const ${lowercase_domain_name_singular}Gateway = new ${capitalized_domain_name_singular}Gateway(gateway);

// Configuração dos use-cases
const presenter = new Presenter();
const create${capitalized_domain_name_singular}UseCase = new Create${capitalized_domain_name_singular}UseCase(${lowercase_domain_name_singular}Gateway, presenter);

const useCases: ${capitalized_domain_name_singular}UseCases = {
  create${capitalized_domain_name_singular}: create${capitalized_domain_name_singular}UseCase
}

const ${lowercase_domain_name_singular}Controller = new ${capitalized_domain_name_singular}Controller({useCases});

// Exportação das instâncias
export { ${lowercase_domain_name_singular}Controller };"
}

# Função principal para criar a estrutura do domínio
create_domain_structure() {
    local domain_name="$1"
    local base_path="src/domains/$domain_name"
    local domain_name_singular=$(to_singular "$domain_name")
    local capitalized_domain_name_singular=$(capitalize_first_letter "$domain_name_singular")
    local lowercase_domain_name_singular=$(lowercase_first_letter "$domain_name_singular")

    # Cria a estrutura de pastas
    mkdir -p "$base_path/controllers"
    mkdir -p "$base_path/entities"
    mkdir -p "$base_path/factories"
    mkdir -p "$base_path/gateways"
    mkdir -p "$base_path/interfaces"
    mkdir -p "$base_path/model"
    mkdir -p "$base_path/repositories"
    mkdir -p "$base_path/routes"
    mkdir -p "$base_path/usecases"

    # Cria os arquivos
    echo "$(create_model_template "$domain_name_singular" "$domain_name")" > "$base_path/model/${lowercase_domain_name_singular}.model.ts"
    echo "$(create_entity_template "$domain_name_singular")" > "$base_path/entities/${lowercase_domain_name_singular}.entity.ts"
    echo "$(create_interface_template "$domain_name_singular")" > "$base_path/interfaces/${lowercase_domain_name_singular}.interface.ts"
    echo "$(create_repository_template "$domain_name_singular")" > "$base_path/repositories/${lowercase_domain_name_singular}.repository.ts"
    echo "$(create_gateway_template "$domain_name_singular")" > "$base_path/gateways/${lowercase_domain_name_singular}.gateway.ts"
    echo "$(create_controller_template "$domain_name_singular")" > "$base_path/controllers/${lowercase_domain_name_singular}.controller.ts"
    echo "$(create_use_case_template "$domain_name_singular")" > "$base_path/usecases/create.${lowercase_domain_name_singular}.usecase.ts"
    echo "$(create_factory_template "$domain_name_singular")" > "$base_path/factories/${lowercase_domain_name_singular}.factory.ts"

    echo "Domínio '$domain_name' criado com sucesso!"
}

# Pergunta o nome do domínio ao usuário
read -p "Qual é o nome do domínio? " domain_name

# Cria a estrutura do domínio
create_domain_structure "$domain_name"