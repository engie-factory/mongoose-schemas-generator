import express from 'express';
import commentCtrl from '../controllers/comment';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/media/:mediaId/comments')
  /* Get a list of recent comments on a media object. */
  /** get /api/comment/media/:mediaId/comments */
  .get(commentCtrl.getMediaByMediaIdComments)
  /* Create a comment on a media object with the following rules:,,* The total length of the comment cannot exceed 300 ,characters.,* The comment cannot contain more than 4 hashtags.,* The comment cannot contain more than 1 URL.,* The comment cannot consist of all capital letters. */
  /** post /api/comment/media/:mediaId/comments */
  .post(commentCtrl.postMediaByMediaIdComments)
  /* Remove a comment either on the authenticated user's media ,object or,authored by the authenticated user. */
  /** delete /api/comment/media/:mediaId/comments */
  .delete(commentCtrl.deleteMediaByMediaIdComments);

export default router;