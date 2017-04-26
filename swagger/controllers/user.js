import User from '../models/User';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const user = new User(req.body);
  user.save()
    .then(_user => res.json(_user.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then(_user => res.json(_user.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then(_user => {
      for (key in req.body) {
        _user[key] = req.body[key];
      }
      _user.save();
      res.json(_user.toObject());
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
  User.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(users => res.json(users.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then(user => {
      const _user = user.toObject();
      user.remove();
      res.json({
        message: 'user successfully deleted',
        id: req.params.userId,
        object: _user
      });
    })
    .catch(e => next(e));
}