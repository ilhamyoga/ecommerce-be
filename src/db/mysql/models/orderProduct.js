'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    orderId: {
      allowNull: false,
      field: 'order_id',
      type: DataTypes.INTEGER(11)
    },
    productId: {
      allowNull: false,
      field: 'product_id',
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
    tableName: 'order_product',
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

  OrderProduct.associate = function (models) {
    OrderProduct.belongsTo(models.Orders, {
      as: 'order',
      foreignKey: 'orderId',
      targetKey: 'id'
    });
    OrderProduct.belongsTo(models.Products, {
      as: 'product',
      foreignKey: 'productId',
      targetKey: 'id'
    });
  };

  return OrderProduct;
};
