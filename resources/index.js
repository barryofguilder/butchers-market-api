import event from './event';

const resources = {
  event,
};

export default function serialize(type, model) {
  const resource = resources[type];
  let data;

  if (Array.isArray(model)) {
    data = model.map(resource);
  } else {
    data = resource(model);
  }

  return { data };
}
