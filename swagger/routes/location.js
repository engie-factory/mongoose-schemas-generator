import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import locationCtrl from '../controllers/location';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/locations/:location-id')
  /* Get information about a location. */
  /** get /api/location/locations/:location-id */
  .get(locationCtrl.getLocationsByLocationId)


router.route('/locations/:location-id/media/recent')
  /* Get a list of recent media objects from a given location. */
  /** get /api/location/locations/:location-id/media/recent */
  .get(locationCtrl.getLocationsByLocationIdMediaRecent)


router.route('/locations/search')
  /* Search for a location by geographic coordinate. */
  /** get /api/location/locations/search */
  .get(locationCtrl.getLocationsSearch)


export default router;