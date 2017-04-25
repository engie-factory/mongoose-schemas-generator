import likes from '../models/likes;'


export const create = (req, res, next) => {
  const likes = new likes(req.body);
  likes.save()
    .then(likes => res.json(likes))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  likes.findOne({ _id: req.params.likesId })
    .then(likes => res.json(likes))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  likes.findOne({ _id: req.params.likesId })
    .then(likes => {
      for (key in req.body) {
        likes[key] = req.body[key];
      }
      likes.save();
      res.json(likes);
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
  likes.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(likes => res.json(likes))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  likes.findOne({ _id: req.params.likesId })
    .then(likes => {
      const likesObj = likes.toObject();
      likes.remove();
      res.json({
        message: 'likes successfully deleted' ,
        id: req.params.likesId,
        object: likesObj
      });
    })
    .catch(e => next(e));
}