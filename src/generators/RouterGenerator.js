import handleBars from 'handlebars';
import path from 'path';
import _ from 'lodash';
import File from '../helpers/File';
import Swagger from '../helpers/Swagger';
import Path from '../helpers/Path';


class RouterGenerator {
  constructor(swaggerPath) {
    this.swaggerPath = swaggerPath;
    
    this.generateRoute = (routes, routeName) => {
      const templateFile = new File(path.resolve(__dirname, '../templates/route.jst'));

      templateFile.read().then((data) => {
        const targetFile = new File(path.resolve(__dirname, `../routes/${routeName}.route.js`));
        const template = handleBars.compile(data.toString());
        const content = template({
          routeName: routeName,
          routes: routes
        });

        targetFile.open(true).then((fd) => {
          targetFile.write(content)
            .then(() => {
              targetFile.close(fd).then(() => {})
                .catch((err) => {
                  throw err;
                });
            }).catch((err) => {
              throw err;
            });
        }).catch((err) => {
          throw err;
        });
      }).catch((err) => {
        throw err;
      });
    };
  }

  generateRoutes() {
    return new Promise((resolve, reject) => {
      const swagger = new Swagger(this.swaggerPath);

      swagger.getPaths().then((paths) => {
        if (!paths) {
          resolve(false);
        }

        const path = new Path(paths);
        const controllers = path.getControllers();
        _.forEach(controllers, (controller, controllerName) => {
          //console.log('paths', JSON.stringify(controller, null, 4));
          this.generateRoute(controller, controllerName);
        });
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

export default RouterGenerator;
