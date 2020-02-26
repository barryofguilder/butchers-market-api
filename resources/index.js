import deliItem from './deli-item';
import hour from './hour';
import event from './event';
import meatBundle from './meat-bundle';

const resources = {
  'deli-item': deliItem,
  hour,
  event,
  'meat-bundle': meatBundle,
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
