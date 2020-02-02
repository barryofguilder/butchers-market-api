export default model => {
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
      self: `/events/${model.id}`,
    },
  };
};
