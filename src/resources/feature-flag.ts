import NAMESPACE from '../constants/namespace';
import type { FeatureFlag } from '../db/models/feature-flag';
import type { ResourceObject } from './types';

export default (model: FeatureFlag): ResourceObject => {
  return {
    type: 'feature-flags',
    id: model.id,
    attributes: {
      name: model.name,
      active: model.active,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
    links: {
      self: `${NAMESPACE}/feature-flags/${model.id}`,
    },
  };
};
