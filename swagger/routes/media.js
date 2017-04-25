import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import mediaCtrl from '../controllers/media';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/media/:media-id')
  /* Get information about a media object.,The returned type key will allow you to differentiate ,between &#x60;image&#x60;,and &#x60;video&#x60; media.,,Note: if you authenticate with an OAuth Token, you will ,receive the,&#x60;user_has_liked&#x60; key which quickly tells you whether the ,current user,has liked this media item. */
  /** get /api/media/media/:media-id */
  .get(mediaCtrl.getMediaByMediaId)


router.route('/media1/:shortcode')
  /* This endpoint returns the same response as **GET** ,&#x60;/media/media-id&#x60;.,,A media object&#x27;s shortcode can be found in its shortlink ,URL.,An example shortlink is &#x60;http://instagram.com/p/D/&#x60;,Its corresponding shortcode is D. */
  /** get /api/media/media1/:shortcode */
  .get(mediaCtrl.getMedia1ByShortcode)


router.route('/media/search')
  /* Search for media in a given area. The default time span is ,set to 5,days. The time span must not exceed 7 days. Defaults time ,stamps cover,the last 5 days. Can return mix of image and video types. */
  /** get /api/media/media/search */
  .get(mediaCtrl.getMediaSearch)


router.route('/media/popular')
  /* Get a list of what media is most popular at the moment.,Can return mix of image and video types. */
  /** get /api/media/media/popular */
  .get(mediaCtrl.getMediaPopular)


router.route('/media/:media-id/comments')
  /* Get a list of recent comments on a media object. */
  /** get /api/media/media/:media-id/comments */
  .get(mediaCtrl.getMediaByMediaIdComments)

  /* Create a comment on a media object with the following rules:,,* The total length of the comment cannot exceed 300 ,characters.,* The comment cannot contain more than 4 hashtags.,* The comment cannot contain more than 1 URL.,* The comment cannot consist of all capital letters. */
  /** post /api/media/media/:media-id/comments */
  .post(mediaCtrl.postMediaByMediaIdComments)

  /* Remove a comment either on the authenticated user&#x27;s media ,object or,authored by the authenticated user. */
  /** delete /api/media/media/:media-id/comments */
  .delete(mediaCtrl.deleteMediaByMediaIdComments)


router.route('/media/:media-id/likes')
  /* Get a list of users who have liked this media. */
  /** get /api/media/media/:media-id/likes */
  .get(mediaCtrl.getMediaByMediaIdLikes)

  /* Set a like on this media by the currently authenticated ,user. */
  /** post /api/media/media/:media-id/likes */
  .post(mediaCtrl.postMediaByMediaIdLikes)

  /* Remove a like on this media by the currently authenticated ,user. */
  /** delete /api/media/media/:media-id/likes */
  .delete(mediaCtrl.deleteMediaByMediaIdLikes)


router.route('/locations/:location-id/media/recent')
  /* Get a list of recent media objects from a given location. */
  /** get /api/media/locations/:location-id/media/recent */
  .get(mediaCtrl.getLocationsByLocationIdMediaRecent)


export default router;