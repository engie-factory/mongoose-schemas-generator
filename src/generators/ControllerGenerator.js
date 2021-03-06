import _ from 'lodash';
import $ from 'shelljs';
import Path from '../structs/Path';
import Swagger from '../structs/Swagger';
import { pluralize } from '../helpers/stringer';
import generateFile from './DefaultGenerator';

class ControllerGenerator {
  constructor(swaggerPath) {
    this.swaggerPath = swaggerPath;
  }

  generateControllers(folderPath) {
    $.mkdir('-p', `${folderPath}/controllers`);
    return new Promise((resolve, reject) => {
      const swagger = new Swagger(this.swaggerPath);
      swagger.getPaths().then((paths) => {
        if (!paths) {
          reject(new Error('No paths available'));
        } else {
          const templateFile = 'controller';
          const path = new Path(paths);
          const _paths = path.getPaths();
          let content = {
            paths: _paths
          };
          _.forEach(_paths, (controller, controllerName) => {
            const pathFile = `${folderPath}/controllers/${pluralize(controllerName, { revert: true })}.js`;
            content = {
              endpointName: controllerName,
              routerName: pluralize(controllerName, { revert: true }),
              structName: pluralize(controllerName, { revert: true, camelcase: true }),
              listName: pluralize(controllerName, { camelcase: true }),
              controllerName: pluralize(controllerName, { revert: true }),
              modelName: pluralize(controllerName, { revert: true, upperfirst: true }),
              pathName: pluralize(controllerName, { camelcase: true }),
              controller,
            };
            generateFile(content, pathFile, templateFile);
          });
          resolve(true);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

export default ControllerGenerator;
