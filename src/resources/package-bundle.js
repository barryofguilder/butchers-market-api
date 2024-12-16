import NAMESPACE from '../constants/namespace';

export default (model) => {
  return {
    type: 'package-bundles',
    id: model.id,
    attributes: {
      displayOrder: model.displayOrder,
      title: model.title,
      fileUrl: model.fileUrl,
      specialText: model.specialText,
      prices: format(model.prices),
      items: format(model.items),
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
    links: {
      self: `${NAMESPACE}/package-bundles/${model.id}`,
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
