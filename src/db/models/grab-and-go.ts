import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import AppModel from './app-model';

export class GrabAndGo extends AppModel<
  InferAttributes<GrabAndGo>,
  InferCreationAttributes<GrabAndGo>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare socialTitle: CreationOptional<string | null>;
  declare description: CreationOptional<string | null>;
  declare imageUrl: CreationOptional<string | null>;
  declare inStock: CreationOptional<boolean | null>;
  declare isHoliday: CreationOptional<boolean | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  GrabAndGo.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      socialTitle: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      inStock: DataTypes.BOOLEAN,
      isHoliday: DataTypes.BOOLEAN,
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: 'GrabAndGo' }
  );

  return GrabAndGo;
};
