import tags from '../models/tags;'


export const create = (req, res, next) => {
  const tags = new tags(req.body);
  tags.save()
    .then(tags => res.json(tags))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  tags.findOne({ _id: req.params.tagsId })
    .then(tags => res.json(tags))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  tags.findOne({ _id: req.params.tagsId })
    .then(tags => {
      for (key in req.body) {
        tags[key] = req.body[key];
      }
      tags.save();
      res.json(tags);
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
  tags.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(tags => res.json(tags))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  tags.findOne({ _id: req.params.tagsId })
    .then(tags => {
      const tagsObj = tags.toObject();
      tags.remove();
      res.json({
        message: 'tags successfully deleted' ,
        id: req.params.tagsId,
        object: tagsObj
      });
    })
    .catch(e => next(e));
}