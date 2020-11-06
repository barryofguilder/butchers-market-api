import NAMESPACE from '../constants/namespace';

export default (model) => {
  return {
    type: 'reviews',
    id: model.id,
    attributes: {
      reviewer: model.reviewer,
      imageUrl: model.imageUrl,
      text: model.text,
      source: model.source,
      url: model.url,
    },
    links: {
      self: `${NAMESPACE}/reviews/${model.id}`,
    },
  };
};
