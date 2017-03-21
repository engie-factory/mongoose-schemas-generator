import { expect } from 'chai';
// import * as fs from 'fs';
import File from '../src/helpers/File';


describe('File Helper', () => {
  describe('Open, write and close a file', () => {
    it('Should create file', (done) => {
      const file = new File(`${__dirname}/resources/helpers.file.test.txt`);
      file.open().then((fd) => {
        file.write('hello world').then(() => {
          file.close(fd).then(() => {
            done();
          }).catch((err) => {
            throw err;
          });
        }).catch((err) => {
          throw err;
        });
      }).catch((err) => {
        throw err;
      });
    });
  });

  describe('Open existing file', () => {
    it('Should throw existing file error', (done) => {
      const file = new File(`${__dirname}/resources/helpers.file.test.txt`);
      file.open().then(() => {
        throw new Error('File should not exist');
      }).catch((err) => {
        expect(err).to.be.an('error');
        done();
      });
    });
  });

  describe('Delete existing file', () => {
    it('Should delete existing file', (done) => {
      const file = new File(`${__dirname}/resources/helpers.file.test.txt`);
      file.delete().then(() => {
        done();
      }).catch((err) => {
        throw err;
      });
    });
  });

  describe('Read File  a file', () => {
    it('Should read a file', (done) => {
      const file = new File(`${__dirname}/resources/swagger.json`);
      file.read().then((content) => {
        expect(content).to.be.an('string');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
});
