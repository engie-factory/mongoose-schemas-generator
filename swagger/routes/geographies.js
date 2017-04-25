import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import geographiesCtrl from '../controllers/geographies';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/geographies/:geo-id/media/recent')
  /* Get recent media from a geography subscription that you ,created.,**Note**: You can only access Geographies that were ,explicitly created,by your OAuth client. Check the Geography Subscriptions ,section of the,[real-time updates ,page](https://instagram.com/developer/realtime/).,When you create a subscription to some geography,that you define, you will be returned a unique geo-id that ,can be used,in this query. To backfill photos from the location covered ,by this,geography, use the [media search endpoint,](https://instagram.com/developer/endpoints/media/). */
  /** get /api/geographies/geographies/:geo-id/media/recent */
  .get(geographiesCtrl.getGeographiesByGeoIdMediaRecent)


export default router;