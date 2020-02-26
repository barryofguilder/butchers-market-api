import deliItem from './deli-item';
import hour from './hour';
import event from './event';
import meatBundle from './meat-bundle';
import packageBundle from './package-bundle';
import review from './review';

const resources = {
  'deli-item': deliItem,
  hour,
  event,
  'meat-bundle': meatBundle,
  'package-bundle': packageBundle,
  review,
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
