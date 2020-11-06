import NAMESPACE from '../constants/namespace';

export default (model) => {
  return {
    type: 'deli-items',
    id: model.id,
    attributes: {
      title: model.title,
      ingredients: model.ingredients,
      imageUrl: model.imageUrl,
    },
    links: {
      self: `${NAMESPACE}/deli-items/${model.id}`,
    },
  };
};
