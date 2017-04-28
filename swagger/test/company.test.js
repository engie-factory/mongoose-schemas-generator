import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, {
  expect
} from 'chai';
import User from '../models/User';
import Client from '../models/Client';
import Company from '../models/Company';
import Project from '../models/Project';
import Document from '../models/Document';
import app from '../../index.js';

chai.config.includeStack = true;

describe('## Company APIs', () => {
/*
** HERE DEFINE OTHER VARIABLES NEEDED FOR TEST DEPENDING ON THE MODEL SCHEMA
*/
	let company = {
		name: ; //MOCK DATA
		rut: ; //MOCK DATA
	};

  after((done) => {
  	User.collection.drop();
		Client.collection.drop();
		Company.collection.drop();
		Project.collection.drop();
		Document.collection.drop();
    done();
	});

	describe('# GET /api/companies/', () => {
		it('showld get all companies', (done) => {
      request(app)
        .get('/api/companies')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
	});

	describe('# POST /api/companies/', () => {
		it('should create a new company', (done) => {
      request(app)
        .post('/api/companies')
        .send(company)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(company.name);
          expect(res.body.rut).to.equal(company.rut);
          company = res.body;
          done();
        })
        .catch(done);
      });
	});

	describe('# GET /api/companies/:companyId', () => {
		it('showld get a company by Id', (done) => {
      request(app)
        .get(`/api/companies/${company._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(company.name);
          expect(res.body.rut).to.equal(company.rut);
          done();
        })
        .catch(done);
    });

    it('showld get Not Found when company not exists', (done) => {
      request(app)
        .get('/api/companies/56c787ccc67fc16ccc1a5e92')
        .set('Authorization', token)
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message)
            .to.equal('Not Found');
          done();
        })
        .catch(done);
    });
	});

	describe('# PUT /api/companies/:companyId', () => {
		it('showld update company', (done) => {
      name: ;//WRITE A NEW VALUE FOR THIS PROP
      rut: ;//WRITE A NEW VALUE FOR THIS PROP
      request(app)
        .put(`/api/companies/${company._id}`)
        .send(company)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(company.name);
          expect(res.body.rut).to.equal(company.rut);
          done();
        })
        .catch(done);
    });
	});

	describe('# DELETE /api/companies/:companyId', () => {
		it('showld delete company', (done) => {
      request(app)
        .delete(`/api/companies/${company._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(company.name);
          expect(res.body.rut).to.equal(company.rut);
          done();
        })
        .catch(done);
    });
	});

