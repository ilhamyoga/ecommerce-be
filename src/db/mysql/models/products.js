'use strict';

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    qty: {
      allowNull: false,
      type: DataTypes.INTEGER(11)
    },
    isActive: {
      allowNull: false,
      field: 'is_active',
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: {
      allowNull: false,   
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deleted: {
      allowNull: false,
      type: DataTypes.INTEGER(1),
      defaultValue: 0
    }
  }, {
    tableName: 'products',
    timestamps: false,
    defaultScope: {
      where: {
        deleted: 0
      },
      attributes: { exclude: ['deleted'] }
    },
    scopes: {
      all: {
        attributes: { exclude: ['deleted'] }
      }
    }
  })

  Products.associate = function (models) {
    Products.belongsToMany(models.Orders, {
      through: models.OrderProduct,
      as: 'orders',
      foreignKey: 'productId',
      otherKey: 'orderId'
    });
  };

  return Products;
};
