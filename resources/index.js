import deliItem from './deli-item';
import hour from './hour';
import event from './event';

const resources = {
  'deli-item': deliItem,
  hour,
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
