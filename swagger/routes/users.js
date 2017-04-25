import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import usersCtrl from '../controllers/users';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/users/userId')
  /* Get basic information about a user. */
  /** get /api/users/users/userId */
  .get(usersCtrl.getUsersByUserId)


router.route('/users/self/feed')
  /* See the authenticated user&#x27;s feed. */
  /** get /api/users/users/self/feed */
  .get(usersCtrl.getUsersSelfFeed)


router.route('/users/userId/media/recent')
  /** get /api/users/users/userId/media/recent */
  .get(usersCtrl.getUsersByUserIdMediaRecent)


router.route('/users/self/media/liked')
  /* See the list of media liked by the authenticated user.,Private media is returned as long as the authenticated user,has permissionto view that media. Liked media lists are only,available for the currently authenticated user. */
  /** get /api/users/users/self/media/liked */
  .get(usersCtrl.getUsersSelfMediaLiked)


router.route('/users/search')
  /* Search for a user by name. */
  /** get /api/users/users/search */
  .get(usersCtrl.getUsersSearch)


export default router;