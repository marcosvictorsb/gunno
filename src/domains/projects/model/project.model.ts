import { Model, DataTypes } from 'sequelize';
import mysql from '../../../infra/database/connection/mysql';

class ProjectModel extends Model {
  id!: number;
  uuid!: string;
  name!: string;
  description!: string;
  created_at!: Date;
  updated_at!: Date;
}

ProjectModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: mysql,
    tableName: 'projects',
    timestamps: true,
    underscored: true,
  }
);

export default ProjectModel;