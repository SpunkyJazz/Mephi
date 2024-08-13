import jsonServer from "json-server";
import getQuestionsJSON from "./mocks/getQuestions.js";
import getQuestionDetailsJSON from "./mocks/getQuestionDetails.js";
import getTestsJSON from "./mocks/getTests.js";
import getVariantDetailsJSON from "./mocks/getVariantDetails.js";
import getTestDetailsJSON from "./mocks/getTestDetails.js";

const addDelay = (delay = 0) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.get("/api/v1/get-questions", async (req, res) => {
  await addDelay(500);
  await res.send(getQuestionsJSON);
});

server.get("/api/v1/get-question/:id", async (req, res) => {
  await addDelay(500);
  await res.send(getQuestionDetailsJSON);
});

server.get("/api/v1/get-tests", async (req, res) => {
  await addDelay(500);
  await res.send(getTestsJSON);
});

server.get("/api/v1/get-test/:id", async (req, res) => {
  await addDelay(500);
  await res.send(getTestDetailsJSON);
});

server.get("/api/v1/get-variant/:testId/:variantNumber", async (req, res) => {
  await addDelay(500);
  await res.send(getVariantDetailsJSON);
});

server.listen(3004, () => {
  console.log(`JSON Server is running: http://localhost:3004`);
});
