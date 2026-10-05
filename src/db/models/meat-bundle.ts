import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import AppModel from './app-model';

export class MeatBundle extends AppModel<
  InferAttributes<MeatBundle>,
  InferCreationAttributes<MeatBundle>
> {
  declare id: CreationOptional<number>;
  declare displayOrder: CreationOptional<number | null>;
  declare title: string;
  // Postgres returns DECIMAL columns as strings to avoid losing precision.
  declare price: string | number;
  declare featured: CreationOptional<boolean | null>;
  declare specialText: CreationOptional<string | null>;
  declare isHidden: CreationOptional<boolean | null>;
  declare orderEnabled: CreationOptional<boolean | null>;
  // `|`-delimited list; the serializer splits it into an array.
  declare items: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  MeatBundle.init(
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
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      featured: DataTypes.BOOLEAN,
      specialText: DataTypes.STRING,
      isHidden: DataTypes.BOOLEAN,
      orderEnabled: DataTypes.BOOLEAN,
      items: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: 'MeatBundle' }
  );

  return MeatBundle;
};
