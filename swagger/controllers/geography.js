import Geography from '../models/Geography';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const geography = new Geography(req.body);
  geography.save()
    .then(_geography => res.json(_geography.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  Geography.findOne({ _id: req.params.geographyId })
    .then(_geography => res.json(_geography.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  Geography.findOne({ _id: req.params.geographyId })
    .then(_geography => {
      for (key in req.body) {
        _geography[key] = req.body[key];
      }
      _geography.save();
      res.json(_geography.toObject());
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
  Geography.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(geographies => res.json(geographies.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  Geography.findOne({ _id: req.params.geographyId })
    .then(geography => {
      const _geography = geography.toObject();
      geography.remove();
      res.json({
        message: 'geography successfully deleted',
        id: req.params.geographyId,
        object: _geography
      });
    })
    .catch(e => next(e));
}