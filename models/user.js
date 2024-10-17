'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.FavouriteWebtoons, { foreignKey: 'userId', as: 'favouriteWebtoons' });
    }
  }

  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('userName', value.trim());
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('email', value.trim());
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};
