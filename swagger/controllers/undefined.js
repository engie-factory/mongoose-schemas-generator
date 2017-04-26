import  from '../models/;'


export const create = (req, res, next) => {
  const  = new (req.body);
  .save()
    .then(_ => res.json(_.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  .findOne({ _id: req.params.Id })
    .then(_ => res.json(_.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  .findOne({ _id: req.params.Id })
    .then(_ => {
      for (key in req.body) {
        _[key] = req.body[key];
      }
      _.save();
      res.json(_.toObject());
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
  .find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then( => res.json(.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  .findOne({ _id: req.params.Id })
    .then( => {
      const _ = .toObject();
      .remove();
      res.json({
        message: ' successfully deleted' ,
        id: req.params.Id,
        object: Obj
      });
    })
    .catch(e => next(e));
}