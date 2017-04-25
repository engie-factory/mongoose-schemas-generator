import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import relationshipsCtrl from '../controllers/relationships';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/users/:user-id/follows')
  /* Get the list of users this user follows. */
  /** get /api/relationships/users/:user-id/follows */
  .get(relationshipsCtrl.getUsersByUserIdFollows)


router.route('/users/:user-id/followed-by')
  /* Get the list of users this user is followed by. */
  /** get /api/relationships/users/:user-id/followed-by */
  .get(relationshipsCtrl.getUsersByUserIdFollowedBy)


router.route('/users/self/requested-by')
  /* List the users who have requested this user&#x27;s permission to ,follow. */
  /** get /api/relationships/users/self/requested-by */
  .get(relationshipsCtrl.getUsersSelfRequestedBy)


router.route('/users/:user-id/relationship')
  /* Modify the relationship between the current user and ,thetarget user. */
  /** post /api/relationships/users/:user-id/relationship */
  .post(relationshipsCtrl.postUsersByUserIdRelationship)


export default router;