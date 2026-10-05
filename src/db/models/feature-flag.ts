import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import AppModel from './app-model';

export class FeatureFlag extends AppModel<
  InferAttributes<FeatureFlag>,
  InferCreationAttributes<FeatureFlag>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare active: CreationOptional<boolean | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  FeatureFlag.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      active: DataTypes.BOOLEAN,
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: 'FeatureFlag' }
  );

  return FeatureFlag;
};
