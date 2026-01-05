module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    'ProductImage',
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productId: {                  // ✅ camelCase
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'productId'           // ✅ DB column
      }
    },
    {
      tableName: 'product_images',
      timestamps: true
    }
  );

  ProductImage.associate = (db) => {
    ProductImage.belongsTo(db.Product, {
      foreignKey: 'productId'
    });
  };

  return ProductImage;
};
