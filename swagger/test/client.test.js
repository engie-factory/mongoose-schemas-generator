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

describe('## Client APIs', () => {
/*
** HERE DEFINE OTHER VARIABLES NEEDED FOR TEST DEPENDING ON THE MODEL SCHEMA
*/
	let client = {
		id: ; //MOCK DATA
		name: ; //MOCK DATA
		secret: ; //MOCK DATA
	};

  after((done) => {
  	User.collection.drop();
		Client.collection.drop();
		Company.collection.drop();
		Project.collection.drop();
		Document.collection.drop();
    done();
	});

	describe('# POST /api/clients/register', () => {
		
	});

