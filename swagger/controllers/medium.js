import Medium from '../models/Medium';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const medium = new Medium(req.body);
  medium.save()
    .then(_medium => res.json(_medium.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  Medium.findOne({ _id: req.params.mediumId })
    .then(_medium => res.json(_medium.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  Medium.findOne({ _id: req.params.mediumId })
    .then(_medium => {
      for (key in req.body) {
        _medium[key] = req.body[key];
      }
      _medium.save();
      res.json(_medium.toObject());
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
  Medium.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(medias => res.json(medias.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  Medium.findOne({ _id: req.params.mediumId })
    .then(medium => {
      const _medium = medium.toObject();
      medium.remove();
      res.json({
        message: 'medium successfully deleted',
        id: req.params.mediumId,
        object: _medium
      });
    })
    .catch(e => next(e));
}