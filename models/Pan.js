module.exports = (sequelize, DataTypes) => {
  const Pan = sequelize.define(
    'Pan',
    {
      panNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
      fullName: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    { tableName: 'Pans', timestamps: true }
  );

  Pan.associate = (db) => {
    Pan.belongsTo(db.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return Pan;
};
