import NAMESPACE from '../constants/namespace';

export default (model) => {
  return {
    type: 'meat-bundles',
    id: model.id,
    attributes: {
      displayOrder: model.displayOrder,
      title: model.title,
      price: model.price,
      featured: model.featured,
      specialText: model.specialText,
      isHidden: model.isHidden,
      orderEnabled: model.orderEnabled,
      items: format(model.items),
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
    links: {
      self: `${NAMESPACE}/meat-bundles/${model.id}`,
    },
  };
};

function format(items) {
  if (items) {
    return items.split('|').map((item) => {
      return item.replace('\n', '').trim();
    });
  }

  return [];
}
