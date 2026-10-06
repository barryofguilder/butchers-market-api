import { Model, type ModelStatic } from 'sequelize';
import NotFoundError from '../../errors/not-found';

export default abstract class AppModel<
  TAttributes extends object,
  TCreationAttributes extends object = TAttributes,
> extends Model<TAttributes, TCreationAttributes> {
  static async findOrFail<M extends Model>(this: ModelStatic<M>, id: number | string): Promise<M> {
    const model = await this.findByPk(id);

    if (model === null) {
      throw new NotFoundError(this.name, String(id));
    }

    return model;
  }
}
