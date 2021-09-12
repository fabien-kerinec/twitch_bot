import 'jest';
import * as express from 'express';
import * as request from 'supertest';
import {
    StatusCodes,
} from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helpers';

describe('twitch Integration test', () => {
    let app: express.Application;

    beforeAll(async() => {
        app = await IntegrationHelpers.getApp();
    });
    it('can auth to twitch', async () => {
      await request(app)
        .get('/auth/twitch')
        .set('Accept', 'application/json')
        .expect(StatusCodes.MOVED_TEMPORARILY);
    });
    it('callback url without token should error', async () => {
      await request(app)
        .get('/auth/twitch/callback')
        .set('Accept', 'application/json')
        .expect(StatusCodes.UNPROCESSABLE_ENTITY);
    });
  
});
