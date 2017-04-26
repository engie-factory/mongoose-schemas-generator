import Location from '../models/Location';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const location = new Location(req.body);
  location.save()
    .then(_location => res.json(_location.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  Location.findOne({ _id: req.params.locationId })
    .then(_location => res.json(_location.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  Location.findOne({ _id: req.params.locationId })
    .then(_location => {
      for (key in req.body) {
        _location[key] = req.body[key];
      }
      _location.save();
      res.json(_location.toObject());
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
  Location.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(locations => res.json(locations.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  Location.findOne({ _id: req.params.locationId })
    .then(location => {
      const _location = location.toObject();
      location.remove();
      res.json({
        message: 'location successfully deleted',
        id: req.params.locationId,
        object: _location
      });
    })
    .catch(e => next(e));
}