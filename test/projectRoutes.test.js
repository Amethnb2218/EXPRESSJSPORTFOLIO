const assert = require("node:assert/strict");
const test = require("node:test");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");

const app = require("../app");
const Project = require("../src/models/projectModel");

let mongoServer;

test.before(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

test.afterEach(async () => {
  await Project.deleteMany({});
});

test.after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("CRUD complet des projets", async () => {
  const projectPayload = {
    libelle: "Jolofera - Plateforme SaaS Reservation & E-commerce",
    image: "https://example.com/image.jpg",
    categorie: "SaaS",
    periode: "2024 - Present",
    statut: "En production",
    role: "Fondateur & Developpeur Full Stack",
    lien: "https://jolofera.com",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    description: "Plateforme SaaS de reservation et e-commerce.",
  };

  const createResponse = await request(app)
    .post("/api/projects")
    .send(projectPayload)
    .expect(201);

  assert.equal(createResponse.body.success, true);
  assert.equal(createResponse.body.data.libelle, projectPayload.libelle);

  const projectId = createResponse.body.data._id;

  const listResponse = await request(app).get("/api/projects").expect(200);

  assert.equal(listResponse.body.success, true);
  assert.equal(listResponse.body.count, 1);

  const detailResponse = await request(app)
    .get(`/api/projects/${projectId}`)
    .expect(200);

  assert.equal(detailResponse.body.data._id, projectId);

  const updateResponse = await request(app)
    .put(`/api/projects/${projectId}`)
    .send({ statut: "Livre" })
    .expect(200);

  assert.equal(updateResponse.body.data.statut, "Livre");

  const deleteResponse = await request(app)
    .delete(`/api/projects/${projectId}`)
    .expect(200);

  assert.equal(deleteResponse.body.success, true);

  await request(app).get(`/api/projects/${projectId}`).expect(404);
});

test("retourne une erreur pour un id invalide", async () => {
  const response = await request(app).get("/api/projects/id-invalide").expect(400);

  assert.equal(response.body.success, false);
  assert.equal(response.body.message, "Identifiant de projet invalide");
});
