import NAMESPACE from '../constants/namespace';
import type { Hour } from '../db/models/hour';
import type { ResourceObject } from './types';

export default (model: Hour): ResourceObject => {
  return {
    type: 'hours',
    id: model.id,
    attributes: {
      type: model.type,
      default: model.default,
      activeStartDate: model.activeStartDate,
      activeEndDate: model.activeEndDate,
      label: model.label,
      line1: model.line1,
      line2: model.line2,
      line3: model.line3,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
    links: {
      self: `${NAMESPACE}/hours/${model.id}`,
    },
  };
};
