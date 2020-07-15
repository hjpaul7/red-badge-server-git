module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("shop", {
    nameOfShop: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    closestTrail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hours: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
    },
  });
  return Shop;
};
