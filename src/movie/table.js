const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Movie = sequelize.define('movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    actor: {
        type: DataTypes.STRING,
        defaultValue:'None specified'
    }
})

module.exports = Movie;