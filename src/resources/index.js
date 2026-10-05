import deliItem from './deli-item';
import featureFlag from './feature-flag';
import hour from './hour';
import grabAndGo from './grab-and-go';
import meatBundle from './meat-bundle';
import menu from './menu';
import packageBundle from './package-bundle';
import review from './review';
import special from './special';

const resources = {
  'deli-item': deliItem,
  'feature-flag': featureFlag,
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
    data = model.map((item) => toResourceObject(resource, item));
  } else {
    data = toResourceObject(resource, model);
  }

  return { data };
}

// JSON:API requires resource object ids to be strings
function toResourceObject(resource, model) {
  const object = resource(model);
  return { ...object, id: String(object.id) };
}
