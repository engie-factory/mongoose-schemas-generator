import _ from 'lodash';
import $ from 'shelljs';
// import winston from 'winston';
import Path from '../structs/Path';
import Swagger from '../structs/Swagger';
import generateFile from './DefaultGenerator';

class RouterGenerator {
  constructor(swaggerPath) {
    this.swaggerPath = swaggerPath;
  }

  generateRoutes(folderPath) {
    $.mkdir('-p', `${folderPath}/routes`);
    $.mkdir('-p', `${folderPath}/controllers`);
    return new Promise((resolve, reject) => {
      const swagger = new Swagger(this.swaggerPath);
      swagger.getPaths().then((paths) => {
        if (!paths) {
          reject(new Error('No paths available'));
        } else {
          const path = new Path(paths);
          const _paths = path.getPaths();
          let pathFile = `${folderPath}/routes/index.js`;
          let templateFile = 'indexRoute';
          let content = {
            paths: _paths
          };
          generateFile(content, pathFile, templateFile);
          _.forEach(_paths, (controller, controllerName) => {
            pathFile = `${folderPath}/routes/${controllerName.toLowerCase()}.js`;
            templateFile = 'route';
            content = {
              routeName: controllerName,
              routes: controller
            };
            generateFile(content, pathFile, templateFile);
            pathFile = `${folderPath}/controllers/${controllerName.toLowerCase()}.js`;
            templateFile = 'controller';
            content = {
              controllerName,
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

export default RouterGenerator;
