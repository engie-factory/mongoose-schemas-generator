import media from '../models/media;'


export const create = (req, res, next) => {
  const media = new media(req.body);
  media.save()
    .then(media => res.json(media))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  media.findOne({ _id: req.params.mediaId })
    .then(media => res.json(media))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  media.findOne({ _id: req.params.mediaId })
    .then(media => {
      for (key in req.body) {
        media[key] = req.body[key];
      }
      media.save();
      res.json(media);
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
  media.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(media => res.json(media))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  media.findOne({ _id: req.params.mediaId })
    .then(media => {
      const mediaObj = media.toObject();
      media.remove();
      res.json({
        message: 'media successfully deleted' ,
        id: req.params.mediaId,
        object: mediaObj
      });
    })
    .catch(e => next(e));
}