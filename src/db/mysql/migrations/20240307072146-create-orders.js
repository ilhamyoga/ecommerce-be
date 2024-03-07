'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      orderCode: {
        allowNull: false,
        field: 'order_code',
        type: Sequelize.STRING(14),
        unique: true,
      },
      userId: {
        allowNull: false,
        field: 'user_id',
        type: Sequelize.INTEGER(11),
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      total: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(["unpaid", "processing", "completed", "cancelled"]),
        defaultValue: "unpaid"
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deleted: {
        allowNull: false,
        type: Sequelize.INTEGER(1),
        defaultValue: 0
      }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};
