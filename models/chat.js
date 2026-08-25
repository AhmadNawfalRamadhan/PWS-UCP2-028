module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pesan_user: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        balasan_ai: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        tableName: 'chats',
        timestamps: true,
    });

    Chat.associate = (models) => {
        Chat.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
    };

    return Chat;
};