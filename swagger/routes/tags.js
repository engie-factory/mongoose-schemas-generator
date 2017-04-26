import express from 'express';
import tagCtrl from '../controllers/tag';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/tags/:tagName')
  /* Get information about a tag object. */
  /** get /api/tag/tags/:tagName */
  .get(tagCtrl.getTagsByTagName);
router.route('/tags/:tagName/media/recent')
  /* Get a list of recently tagged media. Use the `max_tag_id` ,and,`min_tag_id` parameters in the pagination response to ,paginate through,these objects. */
  /** get /api/tag/tags/:tagName/media/recent */
  .get(tagCtrl.getTagsByTagNameMediaRecent);
router.route('/tags/search')
  /** get /api/tag/tags/search */
  .get(tagCtrl.getTagsSearch);

export default router;