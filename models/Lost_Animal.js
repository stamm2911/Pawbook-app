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
      type: DataTypes.DATE,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    found: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'example',
  }
);

module.exports = Lost_Animal;