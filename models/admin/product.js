module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.TEXT,
      price: { type: DataTypes.FLOAT, allowNull: false },
      categoryid: { type: DataTypes.INTEGER, allowNull: false },
      image: DataTypes.STRING,
      stock: { type: DataTypes.INTEGER, defaultValue: 0 },
      isactive: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {
      tableName: 'products',
      timestamps: true
    }
  );

  Product.associate = (db) => {
    Product.belongsTo(db.Category, {
      foreignKey: 'categoryid'
    });

    Product.hasMany(db.ProductImage, {
      foreignKey: 'productId'
    });
  };

  return Product;
};
