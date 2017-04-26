import Relationship from '../models/Relationship';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const relationship = new Relationship(req.body);
  relationship.save()
    .then(_relationship => res.json(_relationship.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  Relationship.findOne({ _id: req.params.relationshipId })
    .then(_relationship => res.json(_relationship.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  Relationship.findOne({ _id: req.params.relationshipId })
    .then(_relationship => {
      for (key in req.body) {
        _relationship[key] = req.body[key];
      }
      _relationship.save();
      res.json(_relationship.toObject());
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
  Relationship.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(relationships => res.json(relationships.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  Relationship.findOne({ _id: req.params.relationshipId })
    .then(relationship => {
      const _relationship = relationship.toObject();
      relationship.remove();
      res.json({
        message: 'relationship successfully deleted',
        id: req.params.relationshipId,
        object: _relationship
      });
    })
    .catch(e => next(e));
}