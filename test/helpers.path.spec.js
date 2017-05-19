import { expect } from 'chai';
// import _ from 'lodash';
import path from 'path';
import Swagger from '../src/structs/Swagger';
import Path from '../src/structs/Path';
// import RouteGenerator from '../src/generators/RouterGenerator';
// import File from '../src/structs/File';

const swagger = new Swagger(path.resolve(__dirname, './resources/swagger.json'));

describe('Paths Test', () => {
  describe('Get parameters', () => {
    it('Should get controller parameters', (done) => {
      try {
        swagger.getPaths().then((paths) => {
          const pats = new Path(paths);
          const routes = pats.getPaths();
          // console.log(routes);
          expect(routes).to.be.an('object');
          done();
        }).catch((err) => {
          done(err);
        });
      } catch (e) {
        done(e);
      }
    });
  });

  /*
  describe('Generate routes', () => {
    it('Should generate routes', (done) => {
      try {
        const generator = new RouteGenerator(`${__dirname}/resources/swagger.json`);
        generator.generateRoutes().then(() => {
          done();
        });
      } catch (e) {
        done(e);
      }
    });
  });
  */
});
