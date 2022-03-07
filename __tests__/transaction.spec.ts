import supertest from 'supertest';
import app from '../src/server';
import mongoose from 'mongoose';
import { createFakeTransaction, createFakeUser, mongoServerInit, accessToken } from './utils';

describe('POST /transactions/', () => {
  mongoServerInit();
  let account;
  let secondAccount;
  beforeEach(async () => {
    account = await createFakeUser('kevin@test.com');
    secondAccount = await createFakeUser('people@test.com');
  });

  it('Should create a new transaction', async () => {
    return supertest(app)
      .post('/transactions/')
      .set('Authorization', accessToken(account._id))
      .send({
        amount: 10,
        receiver_id: secondAccount._id,
      })
      .expect(201);
  });
});
