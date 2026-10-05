import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import AppModel from './app-model';

export class Menu extends AppModel<InferAttributes<Menu>, InferCreationAttributes<Menu>> {
  declare id: CreationOptional<number>;
  declare fileUrl: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  Menu.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      // Nullable, unlike the other models' timestamps, to match how this column was first defined.
      updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: 'Menu' }
  );

  return Menu;
};
