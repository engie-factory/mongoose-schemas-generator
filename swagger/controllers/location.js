import location from '../models/location;'


export const create = (req, res, next) => {
  const location = new location(req.body);
  location.save()
    .then(location => res.json(location))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  location.findOne({ _id: req.params.locationId })
    .then(location => res.json(location))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  location.findOne({ _id: req.params.locationId })
    .then(location => {
      for (key in req.body) {
        location[key] = req.body[key];
      }
      location.save();
      res.json(location);
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
  location.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(location => res.json(location))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  location.findOne({ _id: req.params.locationId })
    .then(location => {
      const locationObj = location.toObject();
      location.remove();
      res.json({
        message: 'location successfully deleted' ,
        id: req.params.locationId,
        object: locationObj
      });
    })
    .catch(e => next(e));
}