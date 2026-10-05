import NAMESPACE from '../constants/namespace';
import type { MeatBundle } from '../db/models/meat-bundle';
import type { ResourceObject } from './types';

export default (model: MeatBundle): ResourceObject => {
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

function format(items: string | null) {
  if (items) {
    return items.split('|').map((item) => {
      return item.replace('\n', '').trim();
    });
  }

  return [];
}
