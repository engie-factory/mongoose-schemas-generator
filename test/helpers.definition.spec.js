import { expect } from 'chai';
import _ from 'lodash';
import Swagger from '../src/helpers/Swagger';
import Definition from '../src/helpers/Definition';
import ModelGenerator from '../src/generators/ModelGenerator';
import File from '../src/helpers/File';


const swagger = new Swagger(`${__dirname}/resources/swagger.json`);

describe('Definitions Test', () => {
  describe('Get definitions schemas', () => {
    it('Should get definitions schemas', (done) => {
      swagger.getDefinitions().then((definitions) => {
        const defs = new Definition(definitions);
        const schemas = defs.getSchemas();
        expect(schemas).to.be.an('object');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('Generate models', () => {
    it('Should generate schemas', (done) => {
      const generator = new ModelGenerator(`${__dirname}/resources/swagger.json`);
      generator.generateSchemas().then(() => {
        swagger.getDefinitions().then((definitions) => {
          if (definitions) {
            const defs = new Definition(definitions);
            const schemas = defs.getSchemas();
            let error = false;
            _.forEach(schemas, (schema) => {
              const file = new File(`${__dirname}/../src/models/${schema.name}.js`);
              file.read().then((content) => {
                _.forEach(schema.properties, (property, key) => {
                  if (content.indexOf(key) === -1) error = true;
                  expect(error).to.be.equal(false);
                });
              }).catch((err) => {
                done(err);
              });
            });
          }
          done();
        }).catch((err) => {
          done(err);
        });
      });
    });
  });
});
