import express from 'express';
import userCtrl from '../controllers/user';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/me')
  /* returns authenticated user */
  /** get /api/users/me */
  .get(userCtrl.getUsersMe);
router.route('/register')
  /* register an unexistent user */
  /** post /api/users/register */
  .post(userCtrl.postUsersRegister);

export default router;