'use strict';
const enums = require('../../../utils/enums');

module.exports = (sequelize, DataTypes) => {
  const Administrators = sequelize.define('Administrators', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    userId: {
      allowNull: false,
      field: 'user_id',
      type: DataTypes.INTEGER(11),
      unique: true
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM(enums.ADMIN_ROLE),
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
    tableName: 'administrators',
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

  Administrators.associate = function (models) {
    Administrators.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
      targetKey: 'id'
    });
  };

  return Administrators;
};
