import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';

export default class Cart extends Model {
  public id!: string;
  public userId!: string;
  public items!: string[];
  public isDeleted!: boolean;
}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    items: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
  }
);
