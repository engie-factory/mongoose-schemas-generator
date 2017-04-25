import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import likesCtrl from '../controllers/likes';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/media/:media-id/likes')
  /* Get a list of users who have liked this media. */
  /** get /api/likes/media/:media-id/likes */
  .get(likesCtrl.getMediaByMediaIdLikes)

  /* Set a like on this media by the currently authenticated ,user. */
  /** post /api/likes/media/:media-id/likes */
  .post(likesCtrl.postMediaByMediaIdLikes)

  /* Remove a like on this media by the currently authenticated ,user. */
  /** delete /api/likes/media/:media-id/likes */
  .delete(likesCtrl.deleteMediaByMediaIdLikes)


export default router;