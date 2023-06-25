const request = require("supertest");
const app = require("./../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
require("../models");

const DATABASE_URL = "/api/v1/movies";
let movieId;

test("POST => 'DATABASE_URL', should return status 201, and res.body.name = body.name", async () => {
  const body = {
    name: "DUNE",
    image:"img .png",
    synopsis:"text",
    releaseYear: 2021,
  };


  const res = await request(app)
    .post(DATABASE_URL)
    .send(body);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
});

test("GET => 'DATABASE_URL', should return status 200 and res.body.lenght = 1", async () => {
  const res = await request(app).get(DATABASE_URL);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});


test("PUT => 'DATABASE_URL', should return 200 and res.body.name = body.name", async () => {
  const body = {
    name: "DUNE",
  };
  const res = await request(app)
    .put(`${DATABASE_URL}/${movieId}`)
    .send(body);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
});



test("getGenres => 'DATABASE_URL', should return 200 and res.body[0].name = genre.name", async () => {
  const genreBody = {
    name: "Science fiction",
  };
  const genre = await Genre.create(genreBody);
  const res = await request(app)
    .post(`${DATABASE_URL}/${movieId}/genres`)
    .send([genre.id]);
  expect(res.status).toBe(200);
  expect(res.body[0].name).toBe(genre.name);
  genre.destroy();
});

test("getActors => 'DATABASE_URL', should return 200 and res.body[0].name = actor.name", async () => {
  const actorBody = {
    firstName: "Zendaya",
    lastName: "Stoermer",
    nationality: "USA",
    image: "img .png",
    birthday: "1996-08-31",
  };
  const actor = await Actor.create(actorBody);
  const res = await request(app)
    .post(`${DATABASE_URL}/${movieId}/actors`)
    .send([actor.id]);
  expect(res.status).toBe(200);
  expect(res.body[0].name).toBe(actor.name);
  actor.destroy();
});

test("getDirectors => 'DATABASE_URL', should return 200 and res.body[0].name = director.name", async () => {
  const directorBody = {
    firstName: "Denis",
    lastName: "Villeneuve",
    nationality: "USA",
    image: "img .png",
    birthday: "1967-10-02",
  };
  const director = await Director.create(directorBody);
  const res = await request(app)
    .post(`${DATABASE_URL}/${movieId}/directors`)
    .send([director.id]);
  expect(res.status).toBe(200);
  expect(res.body[0].name).toBe(director.name);
  director.destroy();
});

test("DELETE -> 'DATABASE_URL', should return status code 204", async()=>{
  const res = await request(app)
      .delete(`${DATABASE_URL}/${movieId}`)

  expect(res.status).toBe(204)
});