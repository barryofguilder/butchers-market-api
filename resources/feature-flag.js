import NAMESPACE from '../constants/namespace';

export default (model) => {
  return {
    type: 'feature-flags',
    id: model.id,
    attributes: {
      name: model.name,
      active: model.active,
    },
    links: {
      self: `${NAMESPACE}/feature-flags/${model.id}`,
    },
  };
};
