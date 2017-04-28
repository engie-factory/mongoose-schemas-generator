import _ from 'lodash';
import $ from 'shelljs';
// import winston from 'winston';
import Path from '../structs/Path';
import Swagger from '../structs/Swagger';
import Definition from '../structs/Definition';
import { pluralize } from '../helpers/stringer';
import generateFile from './DefaultGenerator';

class TestGenerator {
  constructor(swaggerPath) {
    this.swaggerPath = swaggerPath;
  }

  generateTests(folderPath) {
    $.mkdir('-p', `${folderPath}/test`);
    return new Promise((resolve, reject) => {
      let schemas;
      const swagger = new Swagger(this.swaggerPath);
      swagger.getDefinitions()
        .then((definitions) => {
          if (!definitions) {
            reject(new Error('No definitions found'));
          } else {
            const defs = new Definition(definitions);
            schemas = defs.getSchemas();
          }
          swagger.getPaths().then((paths) => {
            if (!paths) {
              reject(new Error('No paths available'));
            } else {
              const path = new Path(paths);
              const _paths = path.getPaths();
              let models = []; // eslint-disable-line prefer-const
              _.forEach(_paths, (routes, routeName) => {
                _.forEach(routes, (route) => {
                  if (models.indexOf(route.modelName) === -1) {
                    models.push(route.modelName);
                  }
                });
                const currentModelName = routes[0].modelName;
                const pathFile = `${folderPath}/test/${pluralize(routeName, { revert: true })}.test.js`;
                const templateFile = 'test';
                const currentModel = schemas[currentModelName];
                const content = {
                  routeName: pluralize(routeName, { revert: true }),
                  currentModelName,
                  currentModel,
                  routes,
                  models
                };
                generateFile(content, pathFile, templateFile);
              });
              resolve(true);
            }
          });
        })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

export default TestGenerator;
