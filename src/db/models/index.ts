import { Sequelize } from 'sequelize';
import dbConfig from '../../config/db';
import { getEnvironment } from '../../utilities/environment';

import initDeliItem from './deli-item';
import initFeatureFlag from './feature-flag';
import initGrabAndGo from './grab-and-go';
import initHour from './hour';
import initMeatBundle from './meat-bundle';
import initMenu from './menu';
import initPackageBundle from './package-bundle';
import initReview from './review';
import initSpecial from './special';

const config = dbConfig[getEnvironment()];

const sequelize = import.meta.env.VITE_DB_URL
  ? new Sequelize(import.meta.env.VITE_DB_URL, config)
  : new Sequelize(config);

const db = {
  DeliItem: initDeliItem(sequelize),
  FeatureFlag: initFeatureFlag(sequelize),
  GrabAndGo: initGrabAndGo(sequelize),
  Hour: initHour(sequelize),
  MeatBundle: initMeatBundle(sequelize),
  Menu: initMenu(sequelize),
  PackageBundle: initPackageBundle(sequelize),
  Review: initReview(sequelize),
  Special: initSpecial(sequelize),
  sequelize,
};

export type Db = typeof db;

export default db;
