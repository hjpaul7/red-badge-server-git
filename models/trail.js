module.exports = (sequelize, DataTypes) => {
  const Trail = sequelize.define("trail", {
    nameOfPark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    length: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trailOptions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
    },
  });
  return Trail;
};
