import deliItem from './deli-item';
import event from './event';

const resources = {
  'deli-item': deliItem,
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
