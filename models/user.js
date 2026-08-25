module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    api_key: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, { 
    tableName: 'users',
    timestamps: true 
  });

  User.associate = (models) => {
    User.hasMany(models.Chat, { foreignKey: 'user_id', as: 'chats' });
  };

  return User;
};