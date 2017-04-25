import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import likesCtrl from '../controllers/likes';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/media/mediaId/likes')
  /* Get a list of users who have liked this media. */
  /** get /api/likes/media/mediaId/likes */
  .get(likesCtrl.getMediaByMediaIdLikes)

  /* Set a like on this media by the currently authenticated ,user. */
  /** post /api/likes/media/mediaId/likes */
  .post(likesCtrl.postMediaByMediaIdLikes)

  /* Remove a like on this media by the currently authenticated ,user. */
  /** delete /api/likes/media/mediaId/likes */
  .delete(likesCtrl.deleteMediaByMediaIdLikes)


export default router;