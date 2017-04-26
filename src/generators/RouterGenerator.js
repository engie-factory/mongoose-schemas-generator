import _ from 'lodash';
import $ from 'shelljs';
// import winston from 'winston';
import Path from '../structs/Path';
import Swagger from '../structs/Swagger';
import { pluralize } from '../helpers/stringer';
import generateFile from './DefaultGenerator';

class RouterGenerator {
  constructor(swaggerPath) {
    this.swaggerPath = swaggerPath;
  }

  generateRoutes(folderPath) {
    $.mkdir('-p', `${folderPath}/routes`);
    return new Promise((resolve, reject) => {
      const swagger = new Swagger(this.swaggerPath);
      swagger.getPaths().then((paths) => {
        if (!paths) {
          reject(new Error('No paths available'));
        } else {
          const path = new Path(paths);
          const _paths = path.getPaths();
          let controllerNames = []; // eslint-disable-line prefer-const
          let indexContent = []; // eslint-disable-line prefer-const
          let pathFile;
          let templateFile;
          let content;
          _.forEach(_paths, (routes, routeName) => {
            _.forEach(routes, (route) => {
              if (controllerNames.indexOf(route.controllerName) === -1) {
                controllerNames.push(route.controllerName);
                const names = {
                  controllerName: route.controllerName,
                  endpointName: route.endpointName
                };
                indexContent.push(names);
              }
            });
            pathFile = `${folderPath}/routes/${routeName}.js`;
            templateFile = 'route';
            content = {
              routeName: pluralize(routeName, { revert: true }),
              routes
            };
            generateFile(content, pathFile, templateFile);
          });
          pathFile = `${folderPath}/routes/index.js`;
          templateFile = 'indexRoute';
          content = {
            indexContent
          };
          generateFile(content, pathFile, templateFile);
          resolve(true);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

export default RouterGenerator;
