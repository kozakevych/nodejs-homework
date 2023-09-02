import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table
class Product extends Model<Product> {
  @Column
  id!: string;

  @Column
  title!: string;

  @Column
  description!: string;

  @Column(DataType.INTEGER)
  price!: number;
}

export default Product;
