import Comment from '../models/Comment';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const comment = new Comment(req.body);
  comment.save()
    .then(_comment => res.json(_comment.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  Comment.findOne({ _id: req.params.commentId })
    .then(_comment => res.json(_comment.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  Comment.findOne({ _id: req.params.commentId })
    .then(_comment => {
      for (key in req.body) {
        _comment[key] = req.body[key];
      }
      _comment.save();
      res.json(_comment.toObject());
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
  Comment.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(comments => res.json(comments.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  Comment.findOne({ _id: req.params.commentId })
    .then(comment => {
      const _comment = comment.toObject();
      comment.remove();
      res.json({
        message: 'comment successfully deleted',
        id: req.params.commentId,
        object: _comment
      });
    })
    .catch(e => next(e));
}