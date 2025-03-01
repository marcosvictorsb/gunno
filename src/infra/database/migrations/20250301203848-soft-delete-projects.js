'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'projects',
      'deleted_at',
      {
        type: Sequelize.DataTypes.DATE,
      }
    );
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('projects', 'deleted_at');    
  },
};
