import Company from '../models/Company';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const company = new Company(req.body);
  company.save()
    .then(_company => res.json(_company.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  Company.findOne({ _id: req.params.companyId })
    .then(_company => res.json(_company.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  Company.findOne({ _id: req.params.companyId })
    .then(_company => {
      for (key in req.body) {
        _company[key] = req.body[key];
      }
      _company.save();
      res.json(_company.toObject());
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
  Company.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(companies => res.json(companies.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  Company.findOne({ _id: req.params.companyId })
    .then(company => {
      const _company = company.toObject();
      company.remove();
      res.json({
        message: 'company successfully deleted',
        id: req.params.companyId,
        object: _company
      });
    })
    .catch(e => next(e));
}