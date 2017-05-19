import express from 'express';
import clientCtrl from '../controllers/client';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/register')
  /* register an unexistent client */
  /** post /api/clients/register */
  .post(clientCtrl.postClientsRegister);

export default router;