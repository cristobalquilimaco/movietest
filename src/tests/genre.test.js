const request = require("supertest");
const app = require("../app");

const DATABASE_URL = "/api/v1/genres";

let genreId;

test("POST -> DATABASE_URL, should return status code 201 and res.body.name === genre.name", async () => {
  const genre = {
    name: "Action",
  };

  const res = await request(app)
    .post(DATABASE_URL)
    .send(genre);

  genreId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(genre.name);
});

test("GET -> DATABASE_URL should return status code 200 and res.body.length === 1", async()=>{
  const res = await request(app).get(DATABASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].genre).toBeUndefined();
});

test("PUT ->'DATABASE_URL', should return 200 and res.body.name === genre.name", async()=>{
  const genre = {
    name:"Action"
  }
  const res= await request(app)
  .put(`${DATABASE_URL}/${genreId}`)
  .send(genre)

  expect(res.status).toBe(200)
  expect(res.body.name).toBe(genre.name)
});

test("DELETE -> 'DATABASE_URL', should return status code 204", async()=>{
  const res = await request(app)
      .delete(`${DATABASE_URL}/${genreId}`)

  expect(res.status).toBe(204)
});