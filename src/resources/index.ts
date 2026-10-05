import deliItem from './deli-item';
import featureFlag from './feature-flag';
import hour from './hour';
import grabAndGo from './grab-and-go';
import meatBundle from './meat-bundle';
import menu from './menu';
import packageBundle from './package-bundle';
import review from './review';
import special from './special';
import type { ResourceObject } from './types';

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

type Resources = typeof resources;
export type ResourceType = keyof Resources;
type ModelFor<T extends ResourceType> = Parameters<Resources[T]>[0];
type Serializer<T extends ResourceType> = (model: ModelFor<T>) => ResourceObject;

export default function serialize<T extends ResourceType>(
  type: T,
  model: ModelFor<T> | ModelFor<T>[]
) {
  // TypeScript can't tie `resources[type]` back to `T` on its own.
  const resource = resources[type] as Serializer<T>;
  let data;

  if (Array.isArray(model)) {
    data = model.map((item) => toResourceObject(resource, item));
  } else {
    data = toResourceObject(resource, model);
  }

  return { data };
}

// JSON:API requires resource object ids to be strings
function toResourceObject<T extends ResourceType>(resource: Serializer<T>, model: ModelFor<T>) {
  const object = resource(model);
  return { ...object, id: String(object.id) };
}
