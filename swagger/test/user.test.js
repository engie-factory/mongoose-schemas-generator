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

describe('## User APIs', () => {
/*
** HERE DEFINE OTHER VARIABLES NEEDED FOR TEST DEPENDING ON THE MODEL SCHEMA
*/
	let user = {
		username: ; //MOCK DATA
		email: ; //MOCK DATA
		password: ; //MOCK DATA
		firstname: ; //MOCK DATA
		lastname: ; //MOCK DATA
		role: ; //MOCK DATA
	};

  after((done) => {
  	User.collection.drop();
		Client.collection.drop();
		Company.collection.drop();
		Project.collection.drop();
		Document.collection.drop();
    done();
	});

	describe('# GET /api/users/me', () => {
		
	});

	describe('# POST /api/users/register', () => {
		
	});

