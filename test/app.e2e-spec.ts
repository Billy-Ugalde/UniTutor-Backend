import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';
import { enableFrontendCors } from './../src/cors.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    enableFrontendCors(app);
    await app.init();
  });

  it('/ (GET) allows requests from the frontend', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Origin', 'http://localhost:5173')
      .expect(200)
      .expect('access-control-allow-origin', 'http://localhost:5173')
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});
