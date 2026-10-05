import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import AppModel from './app-model';

export class DeliItem extends AppModel<
  InferAttributes<DeliItem>,
  InferCreationAttributes<DeliItem>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare ingredients: CreationOptional<string | null>;
  declare isHidden: CreationOptional<boolean | null>;
  declare imageUrl: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  DeliItem.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      ingredients: DataTypes.STRING,
      isHidden: DataTypes.BOOLEAN,
      imageUrl: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: 'DeliItem' }
  );

  return DeliItem;
};
