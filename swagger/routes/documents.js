import express from 'express';
import documentCtrl from '../controllers/document';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /* returns a list of documents */
  /** get /api/documents/ */
  .get(documentCtrl.getDocuments)
  /* create a document */
  /** post /api/documents/ */
  .post(documentCtrl.postDocuments);
router.route('/:documentId')
  /* returns a specific documents */
  /** get /api/documents/:documentId */
  .get(documentCtrl.getDocumentsByDocumentId)
  /* update a document */
  /** put /api/documents/:documentId */
  .put(documentCtrl.putDocumentsByDocumentId)
  /* deletes a specific document */
  /** delete /api/documents/:documentId */
  .delete(documentCtrl.deleteDocumentsByDocumentId);

export default router;