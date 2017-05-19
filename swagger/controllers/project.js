import Project from '../models/Project';

/**
 * BEGIN - Special methods
 */
/**
 * END - Special methods
 */

export const create = (req, res, next) => {
  const project = new Project(req.body);
  project.save()
    .then(_project => res.json(_project.toObject()))
    .catch(e => next(e));
}

export const read = (req, res, next) => {
  Project.findOne({ _id: req.params.projectId })
    .then(_project => res.json(_project.toObject()))
    .catch(e => next(e));
}

export const update = (req, res, next) => {
  Project.findOne({ _id: req.params.projectId })
    .then(_project => {
      for (key in req.body) {
        _project[key] = req.body[key];
      }
      _project.save();
      res.json(_project.toObject());
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
  Project.find(query)
    .skip(parseInt(req.query.skip || 0, 10))
    .limit(parseInt(req.query.limit || 50, 10))
    .then(projects => res.json(projects.toObject()))
    .catch(e => next(e));
}

export const delete = (req, res, next) => {
  Project.findOne({ _id: req.params.projectId })
    .then(project => {
      const _project = project.toObject();
      project.remove();
      res.json({
        message: 'project successfully deleted',
        id: req.params.projectId,
        object: _project
      });
    })
    .catch(e => next(e));
}