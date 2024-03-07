'use strict';
const { generateRandomString, hashPassword } = require('../../utils/helpers');
const enums = require('../enums');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    userCode: {
      allowNull: false,
      field: 'user_code',
      type: DataTypes.STRING(10),
      unique: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(100),
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(100),
      set (value) {
        this.setDataValue('password', hashPassword(value))
      }
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM(enums.USER_STATUS),
      defaultValue: enums.USER_STATUS[0]
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
    tableName: 'users',
    timestamps: false,
    defaultScope: {
      where: {
        deleted: 0
      },
      attributes: { exclude: ['deleted', 'password'] }
    },
    scopes: {
      all: {
        attributes: { exclude: ['deleted'] }
      },
      withPassword: {
        attributes: { include: ['password'] }
      },
    },
    hooks: {
      beforeCreate: (user, options) => {
        user.userUid = generateRandomString(10)
      }
    }
  })

  Users.associate = function (models) {
    Users.hasOne(models.Administrators, {
      as: 'administrator',
      foreignKey: 'userId',
      sourceKey: 'id'
    });
    Users.hasMany(models.Sessions, {
      as: 'sessions',
      foreignKey: 'userId',
      sourceKey: 'id'
    });
    Users.hasMany(models.Orders, {
      as: 'orders',
      foreignKey: 'userId',
      sourceKey: 'id'
    });
  };

  return Users;
};
