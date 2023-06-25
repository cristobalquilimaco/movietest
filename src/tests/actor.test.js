const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");

require("../models");

const DATABASE_URL = "/api/v1/actors";

let actorId;

test("POST -> DATABASE_URL, should return status code 201 and res.body.firstName === actor.firstName", async () => {
  const actor = {
    firstName: "Jennifer",
    lastName: "Lawrence",
    nationality: "USA",
    image: "img .png",
    birthday: "1990-08-14"
  };

  const res = await request(app)
    .post(DATABASE_URL)
    .send(actor);

  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(actor.firstName);
});

test("GET -> DATABASE_URL should return status code 200 and res.body.length === 1", async()=>{
  const res = await request(app).get(DATABASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body).toBeDefined();
});

test("PUT ->'DATABASE_URL', should return 200 and res.body.name === actor.firstName", async()=>{
  const actor = {
    firstName:"Jennifer"
  };
  const res= await request(app)
  .put(`${DATABASE_URL}/${actorId}`)
  .send(actor)

  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(actor.firstName)
});

test("DELETE -> 'DATABASE_URL', should return status code 204", async()=>{
  const res = await request(app)
      .delete(`${DATABASE_URL}/${actorId}`)

  expect(res.status).toBe(204)
});