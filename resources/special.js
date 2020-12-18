import NAMESPACE from '../constants/namespace';

export default (model) => {
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
      isSoldOut: model.isSoldOut,
      isHidden: model.isHidden,
    },
    links: {
      self: `${NAMESPACE}/specials/${model.id}`,
    },
  };
};
