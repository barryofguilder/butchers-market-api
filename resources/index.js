import deliItem from './deli-item';
import hour from './hour';
import grabAndGo from './grab-and-go';
import meatBundle from './meat-bundle';
import menu from './menu';
import packageBundle from './package-bundle';
import review from './review';
import special from './special';

const resources = {
  'deli-item': deliItem,
  hour,
  'grab-and-go': grabAndGo,
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
