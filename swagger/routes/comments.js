import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import commentsCtrl from '../controllers/comments';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/media/:media-id/comments')
  /* Get a list of recent comments on a media object. */
  /** get /api/comments/media/:media-id/comments */
  .get(commentsCtrl.getMediaByMediaIdComments)

  /* Create a comment on a media object with the following rules:,,* The total length of the comment cannot exceed 300 ,characters.,* The comment cannot contain more than 4 hashtags.,* The comment cannot contain more than 1 URL.,* The comment cannot consist of all capital letters. */
  /** post /api/comments/media/:media-id/comments */
  .post(commentsCtrl.postMediaByMediaIdComments)

  /* Remove a comment either on the authenticated user&#x27;s media ,object or,authored by the authenticated user. */
  /** delete /api/comments/media/:media-id/comments */
  .delete(commentsCtrl.deleteMediaByMediaIdComments)


export default router;