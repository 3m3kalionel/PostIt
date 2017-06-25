module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Messages, {
          foreignKey: 'groupId',
          as: 'groupMesages',
        });
      },
    },
  });
  return Group;
};
