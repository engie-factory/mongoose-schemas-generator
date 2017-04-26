import Tag from '../models/Tag';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const tag = new Tag(req.body);
  tag.save()
    .then(_tag => res.json(_tag.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  Tag.findOne({ _id: req.params.tagId })
    .then(_tag => res.json(_tag.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  Tag.findOne({ _id: req.params.tagId })
    .then(_tag => {
      for (key in req.body) {
        _tag[key] = req.body[key];
      }
      _tag.save();
      res.json(_tag.toObject());
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
  Tag.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(tags => res.json(tags.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  Tag.findOne({ _id: req.params.tagId })
    .then(tag => {
      const _tag = tag.toObject();
      tag.remove();
      res.json({
        message: 'tag successfully deleted',
        id: req.params.tagId,
        object: _tag
      });
    })
    .catch(e => next(e));
}