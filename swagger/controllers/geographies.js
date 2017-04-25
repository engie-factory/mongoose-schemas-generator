import geographies from '../models/geographies;'


export const create = (req, res, next) => {
  const geographies = new geographies(req.body);
  geographies.save()
    .then(geographies => res.json(geographies))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  geographies.findOne({ _id: req.params.geographiesId })
    .then(geographies => res.json(geographies))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  geographies.findOne({ _id: req.params.geographiesId })
    .then(geographies => {
      for (key in req.body) {
        geographies[key] = req.body[key];
      }
      geographies.save();
      res.json(geographies);
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
  geographies.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(geographies => res.json(geographies))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  geographies.findOne({ _id: req.params.geographiesId })
    .then(geographies => {
      const geographiesObj = geographies.toObject();
      geographies.remove();
      res.json({
        message: 'geographies successfully deleted' ,
        id: req.params.geographiesId,
        object: geographiesObj
      });
    })
    .catch(e => next(e));
}