'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderPayments = sequelize.define('OrderPayments', {
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
    paymentMethod: {
      allowNull: false,
      field: 'payment_method',
      type: DataTypes.STRING(100)
    },
    proof: {
      allowNull: true,
      type: DataTypes.STRING(255)
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
    tableName: 'order_payments',
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

  OrderPayments.associate = function (models) {
    OrderPayments.belongsTo(models.Orders, {
      as: 'order',
      foreignKey: 'orderId',
      targetKey: 'id'
    });
  };

  return OrderPayments;
};
