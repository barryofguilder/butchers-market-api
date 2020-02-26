import NAMESPACE from '../constants/namespace';

export default model => {
  return {
    type: 'meat-bundles',
    id: model.id,
    attributes: {
      displayOrder: model.displayOrder,
      title: model.title,
      price: model.price,
      featured: model.featured,
      items: model.items ? model.items.split(',') : [],
    },
    links: {
      self: `${NAMESPACE}/meat-bundles/${model.id}`,
    },
  };
};
