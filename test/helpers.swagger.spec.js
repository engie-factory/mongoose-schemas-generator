import { expect } from 'chai';
import Swagger from '../src/helpers/Swagger';

const swagger = new Swagger(`${__dirname}/resources/swagger.json`);

describe('Swagger Generator', () => {
  describe('Get Paths', () => {
    it('Should get paths', (done) => {
      swagger.getPaths().then((paths) => {
        expect(paths).to.be.an('object');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('Get Definitions', () => {
    it('Should get definitions', (done) => {
      swagger.getDefinitions().then((definitions) => {
        expect(definitions).to.be.an('object');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
});
