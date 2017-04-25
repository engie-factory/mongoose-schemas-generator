import express from 'express';
import users from './users';
import relationships from './relationships';
import media from './media';
import comments from './comments';
import likes from './likes';
import tags from './tags';
import location from './location';
import geographies from './geographies';

const router = express.Router(); // eslint-disable-line new-cap

// mount users routes at /users
router.use('/users', users);

// mount relationships routes at /relationships
router.use('/relationships', relationships);

// mount media routes at /media
router.use('/media', media);

// mount comments routes at /comments
router.use('/comments', comments);

// mount likes routes at /likes
router.use('/likes', likes);

// mount tags routes at /tags
router.use('/tags', tags);

// mount location routes at /location
router.use('/location', location);

// mount geographies routes at /geographies
router.use('/geographies', geographies);

export default router;