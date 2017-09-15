module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.STRING
    },
    priority: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE'
    },
    groupId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE'
    },
  }),
  down(queryInterface /* , Sequelize */) {
    queryInterface.dropTable('Messages', {
      cascade: true
    });
  }
};

