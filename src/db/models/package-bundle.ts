import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import AppModel from './app-model';

export class PackageBundle extends AppModel<
  InferAttributes<PackageBundle>,
  InferCreationAttributes<PackageBundle>
> {
  declare id: CreationOptional<number>;
  declare displayOrder: CreationOptional<number | null>;
  declare title: string;
  declare fileUrl: CreationOptional<string | null>;
  declare specialText: CreationOptional<string | null>;
  // `prices` and `items` are `|`-delimited lists; the serializer splits them into arrays.
  declare prices: CreationOptional<string | null>;
  declare items: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  PackageBundle.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      displayOrder: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      fileUrl: DataTypes.STRING,
      specialText: DataTypes.STRING,
      prices: DataTypes.STRING,
      items: DataTypes.TEXT,
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: 'PackageBundle' }
  );

  return PackageBundle;
};
