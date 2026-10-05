import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import AppModel from './app-model';

export class Hour extends AppModel<InferAttributes<Hour>, InferCreationAttributes<Hour>> {
  declare id: CreationOptional<number>;
  declare type: string;
  declare default: CreationOptional<boolean | null>;
  declare activeStartDate: CreationOptional<Date | null>;
  declare activeEndDate: CreationOptional<Date | null>;
  declare label: string;
  declare line1: string;
  declare line2: CreationOptional<string | null>;
  declare line3: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  Hour.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      default: DataTypes.BOOLEAN,
      activeStartDate: DataTypes.DATE,
      activeEndDate: {
        type: DataTypes.DATE,
        validate: {
          isGreaterThanStartDate(this: Hour, value: Date | null) {
            if (this.activeStartDate && value && value < this.activeStartDate) {
              throw new Error('must be greater than start date');
            }
          },
        },
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      line1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      line2: DataTypes.STRING,
      line3: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: 'Hour' }
  );

  return Hour;
};
