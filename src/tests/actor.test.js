const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');

require('../models');

const DATABASE_URL = '/api/v1/actors';

let actorId;

test("POST -> DATABASE_URL, should return status code 201 and res.body.firstName === actor.firstName", async () => {
  const actor = {
    firstName: 'Jennifer',
    lastName: 'Lawrence',
    nationality: 'USA',
    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F21%2F2017%2F02%2Faa.jpg',
    birthday: '1990-08-14'
  };

  const res = await request(app)
    .post(DATABASE_URL)
    .send(actor);

  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(actor.firstName);
});

test("GET -> 'DATABASE_URL'should return status code 200 and res.body.length === 1", async()=>{
  const res = await request(app)
  .get(DATABASE_URL)

expect(res.status).toBe(200)
expect(res.body).toHaveLength(1)
})

test("PUT ->'DATABASE_URL', should return 200 and res.body.name === actor.firstName", async()=>{
  const actor = {
    firstName:"Jennifer"
  }
  const res= await request(app)
  .put(`${DATABASE_URL}/${actorId}`)
  .send(actor)

  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(actor.firstName)
})

