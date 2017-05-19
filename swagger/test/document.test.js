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

describe('## Document APIs', () => {
/*
** HERE DEFINE OTHER VARIABLES NEEDED FOR TEST DEPENDING ON THE MODEL SCHEMA
*/
	let document = {
		name: ; //MOCK DATA
		url: ; //MOCK DATA
		type: ; //MOCK DATA
		companyId: ; //MOCK DATA
		projectId: ; //MOCK DATA
	};

  after((done) => {
  	User.collection.drop();
		Client.collection.drop();
		Company.collection.drop();
		Project.collection.drop();
		Document.collection.drop();
    done();
	});

	describe('# GET /api/documents/', () => {
		it('showld get all documents', (done) => {
      request(app)
        .get('/api/documents')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
	});

	describe('# POST /api/documents/', () => {
		it('should create a new document', (done) => {
      request(app)
        .post('/api/documents')
        .send(document)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(document.name);
          expect(res.body.url).to.equal(document.url);
          expect(res.body.type).to.equal(document.type);
          expect(res.body.companyId).to.equal(document.companyId);
          expect(res.body.projectId).to.equal(document.projectId);
          document = res.body;
          done();
        })
        .catch(done);
      });
	});

	describe('# GET /api/documents/:documentId', () => {
		it('showld get a document by Id', (done) => {
      request(app)
        .get(`/api/documents/${document._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(document.name);
          expect(res.body.url).to.equal(document.url);
          expect(res.body.type).to.equal(document.type);
          expect(res.body.companyId).to.equal(document.companyId);
          expect(res.body.projectId).to.equal(document.projectId);
          done();
        })
        .catch(done);
    });

    it('showld get Not Found when document not exists', (done) => {
      request(app)
        .get('/api/documents/56c787ccc67fc16ccc1a5e92')
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

	describe('# PUT /api/documents/:documentId', () => {
		it('showld update document', (done) => {
      name: ;//WRITE A NEW VALUE FOR THIS PROP
      url: ;//WRITE A NEW VALUE FOR THIS PROP
      type: ;//WRITE A NEW VALUE FOR THIS PROP
      companyId: ;//WRITE A NEW VALUE FOR THIS PROP
      projectId: ;//WRITE A NEW VALUE FOR THIS PROP
      request(app)
        .put(`/api/documents/${document._id}`)
        .send(document)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(document.name);
          expect(res.body.url).to.equal(document.url);
          expect(res.body.type).to.equal(document.type);
          expect(res.body.companyId).to.equal(document.companyId);
          expect(res.body.projectId).to.equal(document.projectId);
          done();
        })
        .catch(done);
    });
	});

	describe('# DELETE /api/documents/:documentId', () => {
		it('showld delete document', (done) => {
      request(app)
        .delete(`/api/documents/${document._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(document.name);
          expect(res.body.url).to.equal(document.url);
          expect(res.body.type).to.equal(document.type);
          expect(res.body.companyId).to.equal(document.companyId);
          expect(res.body.projectId).to.equal(document.projectId);
          done();
        })
        .catch(done);
    });
	});

