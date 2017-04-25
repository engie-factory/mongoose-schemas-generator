import comments from '../models/comments;'


export const create = (req, res, next) => {
  const comments = new comments(req.body);
  comments.save()
    .then(comments => res.json(comments))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  comments.findOne({ _id: req.params.commentsId })
    .then(comments => res.json(comments))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  comments.findOne({ _id: req.params.commentsId })
    .then(comments => {
      for (key in req.body) {
        comments[key] = req.body[key];
      }
      comments.save();
      res.json(comments);
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
  comments.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(comments => res.json(comments))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  comments.findOne({ _id: req.params.commentsId })
    .then(comments => {
      const commentsObj = comments.toObject();
      comments.remove();
      res.json({
        message: 'comments successfully deleted' ,
        id: req.params.commentsId,
        object: commentsObj
      });
    })
    .catch(e => next(e));
}