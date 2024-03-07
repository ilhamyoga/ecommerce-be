'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    userId: {
      allowNull: false,
      field: 'user_id',
      type: DataTypes.INTEGER(11)
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    isValid: {
      allowNull: false,
      field: 'is_valid',
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
    tableName: 'sessions',
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

  Sessions.associate = function (models) {
    Sessions.belongsTo(models.Users, { 
      as: 'user',
      foreignKey: 'userId',  
      targetKey: 'id'
    });
  };

  return Sessions;
};
