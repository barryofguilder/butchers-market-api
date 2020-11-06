import NAMESPACE from '../constants/namespace';

export default (model) => {
  return {
    type: 'events',
    id: model.id,
    attributes: {
      title: model.title,
      leadIn: model.leadIn,
      description: model.description,
      link: model.link,
      imageUrl: model.imageUrl,
      startTime: model.startTime,
      endTime: model.endTime,
    },
    links: {
      self: `${NAMESPACE}/events/${model.id}`,
    },
  };
};
