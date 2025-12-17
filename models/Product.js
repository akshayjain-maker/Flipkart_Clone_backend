module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      offer: {
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.TEXT
      },
      image: {
        type: DataTypes.STRING
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "products"
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category"
    });
  };

  return Product;
};
