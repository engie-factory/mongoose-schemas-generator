import _ from 'lodash';
import Swagger from '../helpers/Swagger';
import Path from '../helpers/Path';
import generateFile from './DefaultGenerator';

class RouterGenerator {
  constructor(swaggerPath) {
    this.swaggerPath = swaggerPath;
  }

  generateRoutes() {
    return new Promise((resolve, reject) => {
      const swagger = new Swagger(this.swaggerPath);

      swagger.getPaths().then((paths) => {
        if (!paths) {
          resolve(false);
        }

        const path = new Path(paths);
        const _paths = path.getPaths();
        _.forEach(_paths, (controller, controllerName) => {

          const pathFile = `../routes/${controllerName}.route.js`;
          const templateFile = 'route';
          const content = {
            routeName: controllerName,
            routes: controller
          };
          generateFile(content, pathFile, templateFile);
        });
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

export default RouterGenerator;
