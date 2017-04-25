import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import tagsCtrl from '../controllers/tags';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/tags/:tag-name')
  /* Get information about a tag object. */
  /** get /api/tags/tags/:tag-name */
  .get(tagsCtrl.getTagsByTagName)


router.route('/tags/:tag-name/media/recent')
  /* Get a list of recently tagged media. Use the &#x60;max_tag_id&#x60; ,and,&#x60;min_tag_id&#x60; parameters in the pagination response to ,paginate through,these objects. */
  /** get /api/tags/tags/:tag-name/media/recent */
  .get(tagsCtrl.getTagsByTagNameMediaRecent)


router.route('/tags/search')
  /** get /api/tags/tags/search */
  .get(tagsCtrl.getTagsSearch)


export default router;