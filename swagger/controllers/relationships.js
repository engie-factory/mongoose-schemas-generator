import relationships from '../models/relationships;'


export const create = (req, res, next) => {
  const relationships = new relationships(req.body);
  relationships.save()
    .then(relationships => res.json(relationships))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  relationships.findOne({ _id: req.params.relationshipsId })
    .then(relationships => res.json(relationships))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  relationships.findOne({ _id: req.params.relationshipsId })
    .then(relationships => {
      for (key in req.body) {
        relationships[key] = req.body[key];
      }
      relationships.save();
      res.json(relationships);
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
  relationships.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(relationships => res.json(relationships))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  relationships.findOne({ _id: req.params.relationshipsId })
    .then(relationships => {
      const relationshipsObj = relationships.toObject();
      relationships.remove();
      res.json({
        message: 'relationships successfully deleted' ,
        id: req.params.relationshipsId,
        object: relationshipsObj
      });
    })
    .catch(e => next(e));
}