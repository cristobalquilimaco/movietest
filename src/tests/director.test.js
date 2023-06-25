const request = require("supertest");
const app = require("../app");


const DATABASE_URL = "/api/v1/directors";

let directorId;

test("POST -> DATABASE_URL, should return status code 201 and res.body.firstName === director.firstName", async () => {
  const director = {
    firstName: "Francis",
    lastName: "Lawrence",
    nationality: "Austria",
    image: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/pyGWo5mAwZ2Koe6leB2RjKd7vmc.jpg",
    birthday: "1971-04-25"
  };

  const res = await request(app)
    .post(DATABASE_URL)
    .send(director);

  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(director.firstName);
});

test("GET -> DATABASE_URL should return status code 200 and res.body.length === 1", async()=>{
  const res = await request(app).get(DATABASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body).toBeDefined();
});

test("PUT ->'DATABASE_URL', should return 200 and res.body.name === director.firstName", async()=>{
  const director = {
    firstName:"Francis"
  };
  const res= await request(app)
  .put(`${DATABASE_URL}/${directorId}`)
  .send(director)

  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(director.firstName)
});

test("DELETE -> 'DATABASE_URL', should return status code 204", async()=>{
  const res = await request(app)
      .delete(`${DATABASE_URL}/${directorId}`)

  expect(res.status).toBe(204)
});