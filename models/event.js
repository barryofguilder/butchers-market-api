export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    leadIn: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
  });

  return Event;
};
