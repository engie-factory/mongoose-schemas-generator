import express from 'express';
import mediumCtrl from '../controllers/medium';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/media/:mediaId')
  /* Get information about a media object.,The returned type key will allow you to differentiate ,between `image`,and `video` media.,,Note: if you authenticate with an OAuth Token, you will ,receive the,`user_has_liked` key which quickly tells you whether the ,current user,has liked this media item. */
  /** get /api/medium/media/:mediaId */
  .get(mediumCtrl.getMediaByMediaId);
router.route('/media1/:shortcode')
  /* This endpoint returns the same response as **GET** ,`/media/media-id`.,,A media object's shortcode can be found in its shortlink ,URL.,An example shortlink is `http://instagram.com/p/D/`,Its corresponding shortcode is D. */
  /** get /api/medium/media1/:shortcode */
  .get(mediumCtrl.getMedia1ByShortcode);
router.route('/media/search')
  /* Search for media in a given area. The default time span is ,set to 5,days. The time span must not exceed 7 days. Defaults time ,stamps cover,the last 5 days. Can return mix of image and video types. */
  /** get /api/medium/media/search */
  .get(mediumCtrl.getMediaSearch);
router.route('/media/popular')
  /* Get a list of what media is most popular at the moment.,Can return mix of image and video types. */
  /** get /api/medium/media/popular */
  .get(mediumCtrl.getMediaPopular);
router.route('/media/:mediaId/comments')
  /* Get a list of recent comments on a media object. */
  /** get /api/medium/media/:mediaId/comments */
  .get(mediumCtrl.getMediaByMediaIdComments)
  /* Create a comment on a media object with the following rules:,,* The total length of the comment cannot exceed 300 ,characters.,* The comment cannot contain more than 4 hashtags.,* The comment cannot contain more than 1 URL.,* The comment cannot consist of all capital letters. */
  /** post /api/medium/media/:mediaId/comments */
  .post(mediumCtrl.postMediaByMediaIdComments)
  /* Remove a comment either on the authenticated user's media ,object or,authored by the authenticated user. */
  /** delete /api/medium/media/:mediaId/comments */
  .delete(mediumCtrl.deleteMediaByMediaIdComments);
router.route('/media/:mediaId/likes')
  /* Get a list of users who have liked this media. */
  /** get /api/medium/media/:mediaId/likes */
  .get(mediumCtrl.getMediaByMediaIdLikes)
  /* Set a like on this media by the currently authenticated ,user. */
  /** post /api/medium/media/:mediaId/likes */
  .post(mediumCtrl.postMediaByMediaIdLikes)
  /* Remove a like on this media by the currently authenticated ,user. */
  /** delete /api/medium/media/:mediaId/likes */
  .delete(mediumCtrl.deleteMediaByMediaIdLikes);
router.route('/locations/:locationId/media/recent')
  /* Get a list of recent media objects from a given location. */
  /** get /api/medium/locations/:locationId/media/recent */
  .get(mediumCtrl.getLocationsByLocationIdMediaRecent);

export default router;