module.exports = (sequelize, DataTypes) => {
  const Time = sequelize.define("time", {
    nameOfPark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    route: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    length: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Time;
};
