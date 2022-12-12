//Factpry pattern
const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      defaultValue: "milad.xsar23",
    },
  });
  User.associate = (models) => {
    User.hasMany(models.message, { onDelete: "CASCADE" });
  };
};
