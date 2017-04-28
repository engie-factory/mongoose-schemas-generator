import express from 'express';
import user from './user';
import client from './client';
import company from './company';
import project from './project';
import document from './document';

const router = express.Router(); // eslint-disable-line new-cap

// mount user routes at /users
router.use('/users', user);

// mount client routes at /clients
router.use('/clients', client);

// mount company routes at /companies
router.use('/companies', company);

// mount project routes at /projects
router.use('/projects', project);

// mount document routes at /documents
router.use('/documents', document);

export default router;