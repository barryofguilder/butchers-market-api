import NAMESPACE from '../constants/namespace';

export default (model) => {
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
