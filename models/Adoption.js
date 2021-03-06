const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Adoption extends Model {}

Adoption.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references:{
        model: 'users',
        key: 'id',
      }
    },
    adopted: {
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
    initialAutoIncrement: 1000,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'adoption',
  }
);

module.exports = Adoption;