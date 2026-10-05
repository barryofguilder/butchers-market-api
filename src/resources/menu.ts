import NAMESPACE from '../constants/namespace';
import type { Menu } from '../db/models/menu';
import type { ResourceObject } from './types';

export default (model: Menu): ResourceObject => {
  return {
    type: 'menus',
    id: model.id,
    attributes: {
      fileUrl: model.fileUrl,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
    links: {
      self: `${NAMESPACE}/menus/${model.id}`,
    },
  };
};
