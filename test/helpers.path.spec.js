import { expect } from 'chai';
import Swagger from '../src/helpers/Swagger';
import Path from '../src/helpers/Path';

const swagger = new Swagger(`${__dirname}/resources/swagger.json`);

describe('Path Test', () => {
  describe('Get parameters', () => {
    it('Should get controller parameters', (done) => {
      swagger.getPaths().then((paths) => {
        const path = new Path(paths);
        const controllers = path.getControllers();
        // console.log('controllers',JSON.stringify(controllers,null,2));
        expect(controllers).to.be.an('array');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
});
