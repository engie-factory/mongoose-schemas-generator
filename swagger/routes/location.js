import express from 'express';
import locationCtrl from '../controllers/location';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/locations/:locationId')
  /* Get information about a location. */
  /** get /api/location/locations/:locationId */
  .get(locationCtrl.getLocationsByLocationId);
router.route('/locations/:locationId/media/recent')
  /* Get a list of recent media objects from a given location. */
  /** get /api/location/locations/:locationId/media/recent */
  .get(locationCtrl.getLocationsByLocationIdMediaRecent);
router.route('/locations/search')
  /* Search for a location by geographic coordinate. */
  /** get /api/location/locations/search */
  .get(locationCtrl.getLocationsSearch);

export default router;