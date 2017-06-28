module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Group, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE',
        },
        Message.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        })
        );
      }
    }
  });
  return Message;
};
