/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoice', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      filename: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      path: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      instalation_number: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      month_reference: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      month_digit_reference: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      electric_energy_quant: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      electric_energy_united_value: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false
      },
      electric_energy_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      energy_scee_icms_quant: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      energy_scee_icms_united_value: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true
      },
      energy_scee_icms_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      compensated_energy_gd_quant: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      compensated_energy_gd_united_value: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true
      },
      compensated_energy_gd_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      public_lighting_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      id_customer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customer',
          key: 'id'
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoice');
  }
};