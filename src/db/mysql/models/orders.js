'use strict';
const enums = require('../../utils/enums');
const { generateUid } = require('../../utils/helpers');

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    orderCode: {
      allowNull: false,
      field: 'order_code',
      type: DataTypes.STRING(14),
      unique: true,
    },
    userId: {
      allowNull: false,
      field: 'user_id',
      type: DataTypes.INTEGER(11)
    },
    total: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM(enums.ORDER_STATUS),
      defaultValue: enums.ORDER_STATUS[0]
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
    tableName: 'orders',
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
    },
    hooks: {
      beforeCreate: (order, options) => {
        order.orderCode = generateUid('TX', 12);
      }
    }
  })

  Orders.associate = function (models) {
    Orders.belongsTo(models.Users, { 
      as: 'user',
      foreignKey: 'userId',
      targetKey: 'id'
    });
    Orders.hasMany(models.OrderProduct, {
      as: 'products',
      foreignKey: 'orderId',
      sourceKey: 'id'
    });
    Orders.hasMany(models.OrderPayments, {
      as: 'payments',
      foreignKey: 'orderId',
      sourceKey: 'id'
    });
  };

  return Orders;
};
