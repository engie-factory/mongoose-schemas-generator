import express from 'express';
import geographyCtrl from '../controllers/geography';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/geographies/:geoId/media/recent')
  /* Get recent media from a geography subscription that you ,created.,**Note**: You can only access Geographies that were ,explicitly created,by your OAuth client. Check the Geography Subscriptions ,section of the,[real-time updates ,page](https://instagram.com/developer/realtime/).,When you create a subscription to some geography,that you define, you will be returned a unique geo-id that ,can be used,in this query. To backfill photos from the location covered ,by this,geography, use the [media search endpoint,](https://instagram.com/developer/endpoints/media/). */
  /** get /api/geography/geographies/:geoId/media/recent */
  .get(geographyCtrl.getGeographiesByGeoIdMediaRecent);

export default router;