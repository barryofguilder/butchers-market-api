import NAMESPACE from '../constants/namespace';
import type { Review } from '../db/models/review';
import type { ResourceObject } from './types';

export default (model: Review): ResourceObject => {
  return {
    type: 'reviews',
    id: model.id,
    attributes: {
      reviewer: model.reviewer,
      imageUrl: model.imageUrl,
      text: model.text,
      source: model.source,
      url: model.url,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
    links: {
      self: `${NAMESPACE}/reviews/${model.id}`,
    },
  };
};
