import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import AppModel from './app-model';

export class Special extends AppModel<InferAttributes<Special>, InferCreationAttributes<Special>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare link: CreationOptional<string | null>;
  declare displayOrder: CreationOptional<number | null>;
  declare imageUrl: string;
  declare imageAltText: string;
  declare activeStartDate: CreationOptional<Date | null>;
  declare activeEndDate: CreationOptional<Date | null>;
  declare inStock: CreationOptional<boolean | null>;
  declare isHidden: CreationOptional<boolean | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  Special.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      link: DataTypes.STRING,
      displayOrder: DataTypes.INTEGER,
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      imageAltText: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      activeStartDate: DataTypes.DATE,
      activeEndDate: {
        type: DataTypes.DATE,
        validate: {
          isGreaterThanStartDate(this: Special, value: Date | null) {
            if (this.activeStartDate && value && value < this.activeStartDate) {
              throw new Error('must be greater than start date');
            }
          },
        },
      },
      inStock: DataTypes.BOOLEAN,
      isHidden: DataTypes.BOOLEAN,
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: 'Special' }
  );

  return Special;
};
