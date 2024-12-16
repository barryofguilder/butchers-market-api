import NAMESPACE from '../constants/namespace';

export default (model) => {
  return {
    type: 'grab-and-gos',
    id: model.id,
    attributes: {
      title: model.title,
      description: model.description,
      imageUrl: model.imageUrl,
      inStock: model.inStock,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
    links: {
      self: `${NAMESPACE}/grab-and-gos/${model.id}`,
    },
  };
};
