import express from 'express';
import userCtrl from '../controllers/user';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/users/:userId')
  /* Get basic information about a user. */
  /** get /api/user/users/:userId */
  .get(userCtrl.getUsersByUserId);
router.route('/users/self/feed')
  /* See the authenticated user's feed. */
  /** get /api/user/users/self/feed */
  .get(userCtrl.getUsersSelfFeed);
router.route('/users/:userId/media/recent')
  /** get /api/user/users/:userId/media/recent */
  .get(userCtrl.getUsersByUserIdMediaRecent);
router.route('/users/self/media/liked')
  /* See the list of media liked by the authenticated user.,Private media is returned as long as the authenticated user,has permissionto view that media. Liked media lists are only,available for the currently authenticated user. */
  /** get /api/user/users/self/media/liked */
  .get(userCtrl.getUsersSelfMediaLiked);
router.route('/users/search')
  /* Search for a user by name. */
  /** get /api/user/users/search */
  .get(userCtrl.getUsersSearch);

export default router;