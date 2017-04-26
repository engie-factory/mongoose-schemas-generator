import express from 'express';
import relationshipCtrl from '../controllers/relationship';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/users/:userId/follows')
  /* Get the list of users this user follows. */
  /** get /api/relationship/users/:userId/follows */
  .get(relationshipCtrl.getUsersByUserIdFollows);
router.route('/users/:userId/:followedBy')
  /* Get the list of users this user is followed by. */
  /** get /api/relationship/users/:userId/:followedBy */
  .get(relationshipCtrl.getUsersByUserIdFollowedBy);
router.route('/users/self/:requestedBy')
  /* List the users who have requested this user's permission to ,follow. */
  /** get /api/relationship/users/self/:requestedBy */
  .get(relationshipCtrl.getUsersSelfRequestedBy);
router.route('/users/:userId/relationship')
  /* Modify the relationship between the current user and ,thetarget user. */
  /** post /api/relationship/users/:userId/relationship */
  .post(relationshipCtrl.postUsersByUserIdRelationship);

export default router;