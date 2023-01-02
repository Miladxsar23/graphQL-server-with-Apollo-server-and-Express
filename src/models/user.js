//Factory pattern
const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      defaultValue: "milad.xsar23",
    },
  });
  User.associate = (models) => {
    User.hasMany(models.message, { onDelete: "CASCADE" });
  };
};
