import NAMESPACE from '../constants/namespace';
import type { Special } from '../db/models/special';
import type { ResourceObject } from './types';

export default (model: Special): ResourceObject => {
  return {
    type: 'specials',
    id: model.id,
    attributes: {
      title: model.title,
      link: model.link,
      displayOrder: model.displayOrder,
      imageUrl: model.imageUrl,
      imageAltText: model.imageAltText,
      activeStartDate: model.activeStartDate,
      activeEndDate: model.activeEndDate,
      inStock: model.inStock,
      isHidden: model.isHidden,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
    links: {
      self: `${NAMESPACE}/specials/${model.id}`,
    },
  };
};
