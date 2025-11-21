import NAMESPACE from '../constants/namespace';

export default (model) => {
  return {
    type: 'grab-and-gos',
    id: model.id,
    attributes: {
      title: model.title,
      socialTitle: model.socialTitle,
      description: model.description,
      imageUrl: model.imageUrl,
      inStock: model.inStock,
      isHoliday: model.isHoliday,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
    links: {
      self: `${NAMESPACE}/grab-and-gos/${model.id}`,
    },
  };
};
