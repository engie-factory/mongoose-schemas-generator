import express from 'express';
import likeCtrl from '../controllers/like';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/media/:mediaId/likes')
  /* Get a list of users who have liked this media. */
  /** get /api/like/media/:mediaId/likes */
  .get(likeCtrl.getMediaByMediaIdLikes)
  /* Set a like on this media by the currently authenticated ,user. */
  /** post /api/like/media/:mediaId/likes */
  .post(likeCtrl.postMediaByMediaIdLikes)
  /* Remove a like on this media by the currently authenticated ,user. */
  /** delete /api/like/media/:mediaId/likes */
  .delete(likeCtrl.deleteMediaByMediaIdLikes);

export default router;