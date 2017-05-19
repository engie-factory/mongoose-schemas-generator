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

describe('## Project APIs', () => {
/*
** HERE DEFINE OTHER VARIABLES NEEDED FOR TEST DEPENDING ON THE MODEL SCHEMA
*/
	let project = {
		name: ; //MOCK DATA
		companyId: ; //MOCK DATA
	};

  after((done) => {
  	User.collection.drop();
		Client.collection.drop();
		Company.collection.drop();
		Project.collection.drop();
		Document.collection.drop();
    done();
	});

	describe('# GET /api/projects/', () => {
		it('showld get all projects', (done) => {
      request(app)
        .get('/api/projects')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
	});

	describe('# POST /api/projects/', () => {
		it('should create a new project', (done) => {
      request(app)
        .post('/api/projects')
        .send(project)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(project.name);
          expect(res.body.companyId).to.equal(project.companyId);
          project = res.body;
          done();
        })
        .catch(done);
      });
	});

	describe('# GET /api/projects/:projectId', () => {
		it('showld get a project by Id', (done) => {
      request(app)
        .get(`/api/projects/${project._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(project.name);
          expect(res.body.companyId).to.equal(project.companyId);
          done();
        })
        .catch(done);
    });

    it('showld get Not Found when project not exists', (done) => {
      request(app)
        .get('/api/projects/56c787ccc67fc16ccc1a5e92')
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

	describe('# PUT /api/projects/:projectId', () => {
		it('showld update project', (done) => {
      name: ;//WRITE A NEW VALUE FOR THIS PROP
      companyId: ;//WRITE A NEW VALUE FOR THIS PROP
      request(app)
        .put(`/api/projects/${project._id}`)
        .send(project)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(project.name);
          expect(res.body.companyId).to.equal(project.companyId);
          done();
        })
        .catch(done);
    });
	});

	describe('# DELETE /api/projects/:projectId', () => {
		it('showld delete project', (done) => {
      request(app)
        .delete(`/api/projects/${project._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(project.name);
          expect(res.body.companyId).to.equal(project.companyId);
          done();
        })
        .catch(done);
    });
	});

