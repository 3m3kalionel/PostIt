module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    content: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Messages.belongsTo(models.Group, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Messages;
};
