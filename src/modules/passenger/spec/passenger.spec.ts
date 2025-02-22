import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { ApplicationModule } from '../../app.module';
import { DatabaseModule } from '../../database';
import { DatabaseService } from '../../database/database.service';
import { Passenger } from '../model';

/**
 * Passenger API end-to-end tests
 *
 * This test suite performs end-to-end tests on the passenger API endpoints,
 * allowing us to test the behavior of the API and making sure that it fits
 * the requirements.
 */
describe('Passenger API', () => {
  let app: INestApplication;
  let dbService: DatabaseService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule, DatabaseModule],
      providers: [DatabaseService]
    }).compile();
    dbService = module.get<DatabaseService>(DatabaseService);
    await (await dbService.getRepository(Passenger)).clear();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => app.close());

  it('Should return empty passenger list', () =>
    request(app.getHttpServer())
      .get('/passengers')
      .expect(HttpStatus.OK)
      .then(response => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toEqual(0);
      }));

  it('Should insert new passenger in the API', () =>
    request(app.getHttpServer())
      .post('/passengers')
      .send({
        firstName: 'John',
        lastName: 'Doe'
      })
      .expect(HttpStatus.CREATED)
      .then(response => {
        expect(response.body.firstName).toEqual('John');
        expect(response.body.lastName).toEqual('Doe');
      }));
});
