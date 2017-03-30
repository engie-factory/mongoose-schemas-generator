import _ from 'lodash';
import Swagger from '../structs/Swagger';
import Path from '../structs/Path';
import generateFile from './DefaultGenerator';

class RouterGenerator {
  constructor(swaggerPath) {
    this.swaggerPath = swaggerPath;
  }

  generateRoutes(folderPath) {
    return new Promise((resolve, reject) => {
      const swagger = new Swagger(this.swaggerPath);
      swagger.getPaths().then((paths) => {
        if (!paths) {
          reject(new Error('No paths available'));
        } else {
          const path = new Path(paths);
          const _paths = path.getPaths();
          _.forEach(_paths, (controller, controllerName) => {
            const pathFile = `${folderPath}/${controllerName}.route.js`;
            const templateFile = 'route';
            const content = {
              routeName: controllerName,
              routes: controller
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

export default RouterGenerator;
