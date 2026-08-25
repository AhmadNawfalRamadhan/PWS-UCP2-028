module.exports = (sequelize, DataTypes) => {
    const Developer = sequelize.define('Developer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        negara: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        tableName: 'developers',
        timestamps: true,
    });

    Developer.associate = (models) => {
        Developer.hasMany(models.Game, {
            foreignKey: 'developer_id',
            as: 'games',
        });
    };

    return Developer;
};