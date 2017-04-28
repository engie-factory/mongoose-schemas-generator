import express from 'express';
import projectCtrl from '../controllers/project';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /* returns a list of projects */
  /** get /api/projects/ */
  .get(projectCtrl.getProjects)
  /* create a project */
  /** post /api/projects/ */
  .post(projectCtrl.postProjects);
router.route('/:projectId')
  /* returns a specific projects */
  /** get /api/projects/:projectId */
  .get(projectCtrl.getProjectsByProjectId)
  /* update a project */
  /** put /api/projects/:projectId */
  .put(projectCtrl.putProjectsByProjectId)
  /* deletes a specific project */
  /** delete /api/projects/:projectId */
  .delete(projectCtrl.deleteProjectsByProjectId);

export default router;