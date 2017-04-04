import _ from 'lodash';
import $ from 'shelljs';
// import winston from 'winston';
import Path from '../structs/Path';
import Swagger from '../structs/Swagger';
// import generateFile from './DefaultGenerator';

class RouterGenerator {
  constructor(swaggerPath) {
    this.swaggerPath = swaggerPath;
  }

  generateRoutes(folderPath) {
    $.mkdir('-p', folderPath);
    return new Promise((resolve, reject) => {
      const swagger = new Swagger(this.swaggerPath);
      swagger.getPaths()
        .then((paths) => {
          if (!paths) {
            reject(new Error('No paths available'));
          } else {
            const pats = new Path(paths);
            const routes = pats.getPaths();
            _.forEach(routes, (/* route */) => {
              // console.log(route);
              // console.log(route.length);
              // console.log(route[0].methods);
              /*
              const pathFile = `${folderPath}/${controllerName}.route.js`;
              const templateFile = 'route';
              const content = {
                routeName: controllerName,
                routes: controller
              };
              generateFile(content, pathFile, templateFile);
              */
            });
            resolve(true);
          }
        }).catch(reject);
    });
  }
}

export default RouterGenerator;
