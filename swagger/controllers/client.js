import Client from '../models/Client';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const client = new Client(req.body);
  client.save()
    .then(_client => res.json(_client.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  Client.findOne({ _id: req.params.clientId })
    .then(_client => res.json(_client.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  Client.findOne({ _id: req.params.clientId })
    .then(_client => {
      for (key in req.body) {
        _client[key] = req.body[key];
      }
      _client.save();
      res.json(_client.toObject());
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
  Client.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(clients => res.json(clients.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  Client.findOne({ _id: req.params.clientId })
    .then(client => {
      const _client = client.toObject();
      client.remove();
      res.json({
        message: 'client successfully deleted',
        id: req.params.clientId,
        object: _client
      });
    })
    .catch(e => next(e));
}