module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'Categories',
      timestamps: true
    }
  );

  // optional association
  Category.associate = (db) => {
    Category.hasMany(db.Product, { foreignKey: 'categoryid' });
  };

  return Category;
};
