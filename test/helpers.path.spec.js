/*
import { expect } from 'chai';
import Swagger from '../src/structs/Swagger';
import Path from '../src/structs/Path';
import RouteGenerator from '../src/generators/RouterGenerator';

const swagger = new Swagger(`${__dirname}/resources/swagger.json`);

describe('Path Test', () => {
  describe('Get parameters', () => {
    it('Should get controller parameters', (done) => {
      swagger.getPaths().then((paths) => {
        const path = new Path(paths);
        const _paths = path.getPaths();
        expect(_paths).to.be.an('object');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('Generate routes', () => {
    it('Should generate routes', (done) => {
      const generator = new RouteGenerator(`${__dirname}/resources/swagger.json`);
      generator.generateRoutes().then(() => {
        done();
      });
    });
  });
});
*/
