const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Lost_Animal extends Model {}

Lost_Animal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    last_seen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    found: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    initialAutoIncrement: 2000,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'lost_animal',
  }
);

module.exports = Lost_Animal;
