module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deskripsi: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        tahun_rilis: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        gambar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        developer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'games',
        timestamps: true,
    });

    Game.associate = (models) => {
        Game.belongsTo(models.Developer, {
            foreignKey: 'developer_id',
            as: 'developer',
        });
        
        Game.belongsToMany(models.Genre, {
            through: 'Game_genre',
            foreignKey: 'game_id',
            otherKey: 'genre_id',
            as: 'genres',
        });
    };

    return Game;
};