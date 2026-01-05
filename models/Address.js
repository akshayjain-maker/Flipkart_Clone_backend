module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    pincode: DataTypes.STRING,
    locality: DataTypes.STRING,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    landmark: DataTypes.STRING,
    alternatePhone: DataTypes.STRING,
    addressType: {
      type: DataTypes.ENUM("HOME", "WORK"),
      defaultValue: "HOME"
    }
  });

  Address.associate = (db) => {
    Address.belongsTo(db.User, { foreignKey: "userId" });
  };

  return Address;
};
