import express from 'express';
import user from './user';
import medium from './medium';
import media1 from './media1';
import location from './location';
import tag from './tag';
import geography from './geography';

const router = express.Router(); // eslint-disable-line new-cap

// mount user routes at /users
router.use('/users', user);

// mount medium routes at /media
router.use('/media', medium);

// mount media1 routes at /media1
router.use('/media1', media1);

// mount location routes at /locations
router.use('/locations', location);

// mount tag routes at /tags
router.use('/tags', tag);

// mount geography routes at /geographies
router.use('/geographies', geography);

export default router;