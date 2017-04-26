import Like from '../models/Like';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const like = new Like(req.body);
  like.save()
    .then(_like => res.json(_like.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  Like.findOne({ _id: req.params.likeId })
    .then(_like => res.json(_like.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  Like.findOne({ _id: req.params.likeId })
    .then(_like => {
      for (key in req.body) {
        _like[key] = req.body[key];
      }
      _like.save();
      res.json(_like.toObject());
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
  Like.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(likes => res.json(likes.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  Like.findOne({ _id: req.params.likeId })
    .then(like => {
      const _like = like.toObject();
      like.remove();
      res.json({
        message: 'like successfully deleted',
        id: req.params.likeId,
        object: _like
      });
    })
    .catch(e => next(e));
}