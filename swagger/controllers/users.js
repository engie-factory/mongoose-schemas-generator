import users from '../models/users;'


export const create = (req, res, next) => {
  const users = new users(req.body);
  users.save()
    .then(users => res.json(users))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  users.findOne({ _id: req.params.usersId })
    .then(users => res.json(users))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  users.findOne({ _id: req.params.usersId })
    .then(users => {
      for (key in req.body) {
        users[key] = req.body[key];
      }
      users.save();
      res.json(users);
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
  users.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(users => res.json(users))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  users.findOne({ _id: req.params.usersId })
    .then(users => {
      const usersObj = users.toObject();
      users.remove();
      res.json({
        message: 'users successfully deleted' ,
        id: req.params.usersId,
        object: usersObj
      });
    })
    .catch(e => next(e));
}