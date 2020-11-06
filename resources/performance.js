import NAMESPACE from '../constants/namespace';

export default (model) => {
  return {
    type: 'performances',
    id: model.id,
    attributes: {
      title: model.title,
      link: model.link,
    },
    links: {
      self: `${NAMESPACE}/performances/${model.id}`,
    },
  };
};
