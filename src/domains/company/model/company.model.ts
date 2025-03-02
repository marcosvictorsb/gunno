import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import mysql from '../../../infra/database/connection/mysql';

class CompanyModel extends Model {
  id!: number;
  uuid!: string;
  name!: string;
  domain!: string;
  created_at!: Date;
  updated_at!: Date;
}

CompanyModel.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: mysql,
    tableName: 'companies',
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);

export { CompanyModel };
