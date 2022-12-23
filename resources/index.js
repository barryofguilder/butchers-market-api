import deliItem from './deli-item';
import hour from './hour';
import event from './event';
import meatBundle from './meat-bundle';
import menu from './menu';
import packageBundle from './package-bundle';
import review from './review';
import special from './special';

const resources = {
  'deli-item': deliItem,
  hour,
  event,
  'meat-bundle': meatBundle,
  menu,
  'package-bundle': packageBundle,
  review,
  special,
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
