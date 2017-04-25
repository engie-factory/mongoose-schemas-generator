import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import relationshipsCtrl from '../controllers/relationships';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/users/userId/follows')
  /* Get the list of users this user follows. */
  /** get /api/relationships/users/userId/follows */
  .get(relationshipsCtrl.getUsersByUserIdFollows)


router.route('/users/userId/followedBy')
  /* Get the list of users this user is followed by. */
  /** get /api/relationships/users/userId/followedBy */
  .get(relationshipsCtrl.getUsersByUserIdFollowedBy)


router.route('/users/self/requestedBy')
  /* List the users who have requested this user&#x27;s permission to ,follow. */
  /** get /api/relationships/users/self/requestedBy */
  .get(relationshipsCtrl.getUsersSelfRequestedBy)


router.route('/users/userId/relationship')
  /* Modify the relationship between the current user and ,thetarget user. */
  /** post /api/relationships/users/userId/relationship */
  .post(relationshipsCtrl.postUsersByUserIdRelationship)


export default router;