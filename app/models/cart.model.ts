import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table
class Cart extends Model<Cart> {
  @Column
  id!: string;

  @Column
  userId!: string;

  @Column(DataType.ARRAY)
  items!: Array<string>;

  @Column
  isDeleted!: boolean;
}

export default Cart;
