export default class NotFoundError extends Error {
  modelName: string;
  id: string;

  constructor(modelName: string, id: string) {
    super();

    this.modelName = modelName;
    this.id = id;
  }
}
