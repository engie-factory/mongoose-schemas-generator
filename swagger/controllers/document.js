import Document from '../models/Document';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const document = new Document(req.body);
  document.save()
    .then(_document => res.json(_document.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  Document.findOne({ _id: req.params.documentId })
    .then(_document => res.json(_document.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  Document.findOne({ _id: req.params.documentId })
    .then(_document => {
      for (key in req.body) {
        _document[key] = req.body[key];
      }
      _document.save();
      res.json(_document.toObject());
    })
    .catch(e => next(e));
}

export const list = (req, res, next) => {
  const query = { $and: [] };
  for (key in req.query) {
    if (key !== 'skip' && key !== 'limit') {
      const param = {};
      param[key] = req.query.key;
      query.$and.push(param);
    }
  }
  Document.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(documents => res.json(documents.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  Document.findOne({ _id: req.params.documentId })
    .then(document => {
      const _document = document.toObject();
      document.remove();
      res.json({
        message: 'document successfully deleted',
        id: req.params.documentId,
        object: _document
      });
    })
    .catch(e => next(e));
}