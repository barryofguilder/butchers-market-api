import Sequelize from 'sequelize';
import dbConfig from '../../config/db';
import NotFoundError from '../../errors/not-found';

import initDeliItem from './deli-item';
import initFeatureFlag from './feature-flag';
import initGrabAndGo from './grab-and-go';
import initHour from './hour';
import initMeatBundle from './meat-bundle';
import initMenu from './menu';
import initPackageBundle from './package-bundle';
import initReview from './review';
import initSpecial from './special';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const db = {};
let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, config);
} else {
  sequelize = new Sequelize(config);
}

const deliItem = initDeliItem(sequelize);
db[deliItem.name] = deliItem;
const featureFlag = initFeatureFlag(sequelize);
db[featureFlag.name] = featureFlag;
const grabAndGo = initGrabAndGo(sequelize);
db[grabAndGo.name] = grabAndGo;
const hour = initHour(sequelize);
db[hour.name] = hour;
const meatBundle = initMeatBundle(sequelize);
db[meatBundle.name] = meatBundle;
const menu = initMenu(sequelize);
db[menu.name] = menu;
const packageBundle = initPackageBundle(sequelize);
db[packageBundle.name] = packageBundle;
const review = initReview(sequelize);
db[review.name] = review;
const special = initSpecial(sequelize);
db[special.name] = special;

Object.keys(db).forEach((modelName) => {
  const Model = db[modelName];

  if (Model.associate) {
    Model.associate(db);
  }

  Model.findOrFail = async (id) => {
    let m = await Model.findByPk(id);

    if (m === null) {
      throw new NotFoundError(modelName, id);
    }

    return m;
  };
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
