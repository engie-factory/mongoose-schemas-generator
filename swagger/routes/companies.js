import express from 'express';
import companyCtrl from '../controllers/company';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /* returns a list of companies */
  /** get /api/companies/ */
  .get(companyCtrl.getCompanies)
  /* create a company */
  /** post /api/companies/ */
  .post(companyCtrl.postCompanies);
router.route('/:companyId')
  /* returns a specific company */
  /** get /api/companies/:companyId */
  .get(companyCtrl.getCompaniesByCompanyId)
  /* update a company */
  /** put /api/companies/:companyId */
  .put(companyCtrl.putCompaniesByCompanyId)
  /* deletes a specific company */
  /** delete /api/companies/:companyId */
  .delete(companyCtrl.deleteCompaniesByCompanyId);

export default router;