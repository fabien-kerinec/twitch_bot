import 'jest';
import * as express from 'express';
import * as request from 'supertest';
import {
    StatusCodes,
} from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helpers';

describe('base Integration test', () => {
    let app: express.Application;

    beforeAll(async() => {
        app = await IntegrationHelpers.getApp();
    });


    it('test the base path', async () => {
        await request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        message : 'base path' 
                    })
                );
            });
    });

});
