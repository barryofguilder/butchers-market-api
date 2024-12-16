import NAMESPACE from '../constants/namespace';

export default (model) => {
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
