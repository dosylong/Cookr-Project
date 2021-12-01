const prisma = require('../models/prisma');

class UserController {
  createUserProfile = async (req, res, next) => {
    try {
      //check username is exist or not
      const usernameExist = await prisma.user.findUnique({
        where: {
          userFirebaseId: req.body.userFirebaseId,
        },
      });

      if (usernameExist) {
        return res.status(400).json({
          message: 'Username already exist!',
        });
      }

      const createUserProfile = await prisma.user.create({
        data: {
          userFirebaseId: req.body.userFirebaseId,
          username: req.body.username,
          email: req.body.email,
          bio: req.body.bio,
          fullName: req.body.fullName,
          photoURL: String(req.body.photoURL),
        },
      });
      res.status(201).json(createUserProfile);
    } catch (error) {
      return next(error);
    }
  };

  updateUserProfile = async (req, res, next) => {
    try {
      const updateUserProfileInDb = await prisma.user.update({
        data: {
          username: req.body.username,
          bio: req.body.bio,
          fullName: req.body.fullName,
        },
        where: {
          userFirebaseId: req.body.userFirebaseId,
        },
      });
      res.status(200).json(updateUserProfileInDb);
    } catch (error) {
      return next(error);
    }
  };

  updateAvatar = async (req, res, next) => {
    try {
      const response = await prisma.user.update({
        where: {
          userFirebaseId: req.body.userFirebaseId,
        },
        data: {
          photoURL: req.body.photoURL,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };

  getUserProfile = async (req, res, next) => {
    try {
      const getUserProfileInDb = await prisma.user.findFirst({
        where: {
          userFirebaseId: req.query.userFirebaseId,
        },
      });
      if (!getUserProfileInDb) {
        return res.status(200).json({ message: 'User not found' });
      }
      res.status(200).json({ ...getUserProfileInDb, message: 'User founded' });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new UserController();
