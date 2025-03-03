'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'id_company', {
      type: Sequelize.INTEGER,
      before: 'created_at',            
    })

    await queryInterface.addConstraint('users', {
      fields: ['id_company'],
      type: 'foreign key',
      name: 'fk_users_company_id',
      references: {
        table: 'companies',
        field: 'id'
      }
    })
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'fk_users_company_id');

    await queryInterface.removeColumn('users', 'id_company');
  }
};
