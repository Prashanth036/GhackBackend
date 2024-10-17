const db = require('../models');
const { User, FavouriteWebtoons } = require('../models');

const getFavourites = async (userId) => {
  const user = await db.User.findOne({
    where: { id: userId },
    include: [{
      model: db.FavouriteWebtoons,
      as: 'favouriteWebtoons',
    }],
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user.favouriteWebtoons;
};

const getFavouriteWebToons = async (req, res) => {
  const userId = req.user.userId;
  try {
    const favourites = await getFavourites(userId);
    console.log(favourites)
    res.status(200).json(favourites);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
};

const addFavouriteWebToon=async(req,res)=>{
  const userId = req.user.userId;

  const body=req.body
  body.userId=userId
  try {
    const favourites =await db.FavouriteWebtoons.create(body);
    res.status(200).json(favourites);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

}

module.exports = {
    getFavouriteWebToons,
    addFavouriteWebToon
};
