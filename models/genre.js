module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'genres',
        timestamps: true,
    });

    Genre.associate = (models) => {
        Genre.belongsToMany(models.Game, {
            through: 'Game_genre',
            foreignKey: 'genre_id',
            otherKey: 'game_id',
            as: 'games',
        });
    };

    return Genre;
};