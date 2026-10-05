import NAMESPACE from '../constants/namespace';
import type { DeliItem } from '../db/models/deli-item';
import type { ResourceObject } from './types';

export default (model: DeliItem): ResourceObject => {
  return {
    type: 'deli-items',
    id: model.id,
    attributes: {
      title: model.title,
      ingredients: model.ingredients,
      isHidden: model.isHidden,
      imageUrl: model.imageUrl,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
    links: {
      self: `${NAMESPACE}/deli-items/${model.id}`,
    },
  };
};
