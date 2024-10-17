'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class FavouriteWebtoons extends Model {
    static associate(models) {
      FavouriteWebtoons.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  FavouriteWebtoons.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Title is required' },
          len: {
            args: [1, 100],
            msg: 'Title length must be between 1 and 100 characters',
          },
        },
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Creator is required' },
        },
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Genre is required' },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      views: {
        type: DataTypes.STRING,
        allowNull: true,
      
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
     
    },
    {
      sequelize,
      modelName: 'FavouriteWebtoons',
      tableName: 'favourite_webtoons',
      timestamps: true,
    }
  );
  return FavouriteWebtoons;
};
