import jsonServer from "json-server";
import getQuestionsJSON from "./mocks/getQuestions.js";
import getQuestionDetailsJSON from "./mocks/getQuestionDetails.js";
import getTestsJSON from "./mocks/getTests.js";
import getVariantDetailsJSON from "./mocks/getVariantDetails.js";
import getTestDetailsJSON from "./mocks/getTestDetails.js";
import getThemesJSON from "./mocks/getThemes.js";
import getOpenTestsJSON from "./mocks/getOpenTests.js";
import getTestPassingJSON from "./mocks/getTestPassing.js";

const addDelay = (delay = 0) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.put("/api/v1/generate-test", async (req, res) => {
  await addDelay(500);
  await res.send();
});

server.get("/api/v1/get-themes", async (req, res) => {
  await addDelay(500);
  await res.send(getThemesJSON);
});

server.get("/api/v1/get-questions", async (req, res) => {
  await addDelay(500);
  await res.send(getQuestionsJSON);
});

server.get("/api/v1/get-question/:id", async (req, res) => {
  await addDelay(500);
  await res.send(getQuestionDetailsJSON);
});

server.delete("/api/v1/delete-question/:id", async (req, res) => {
  await addDelay(500);
  await res.send();
});

server.put("/api/v1/edit-question-usage", async (req, res) => {
  await addDelay(500);
  await res.send();
});

server.put("/api/v1/add-answer", async (req, res) => {
  await addDelay(500);
  await res.send();
});

server.put("/api/v1/save-question", async (req, res) => {
  await addDelay(500);
  await res.send();
});

server.get("/api/v1/get-tests", async (req, res) => {
  await addDelay(500);
  await res.send(getTestsJSON);
});

server.get("/api/v1/get-test/:id", async (req, res) => {
  await addDelay(500);
  await res.send(getTestDetailsJSON);
});

server.delete("/api/v1/delete-test/:id", async (req, res) => {
  await addDelay(500);
  await res.send();
});

server.put("/api/v1/edit-test-usage", async (req, res) => {
  await addDelay(500);
  await res.send();
});

server.get("/api/v1/get-variant/:testId/:variantNumber", async (req, res) => {
  await addDelay(500);
  await res.send(getVariantDetailsJSON);
});

server.get("/api/v1/get-open-tests", async (req, res) => {
  await addDelay(500);
  await res.send(getOpenTestsJSON);
});

server.get("/api/v1/get-test-passing/:passingTestId", async (req, res) => {
  await addDelay(500);
  await res.send(getTestPassingJSON);
});

server.listen(3004, () => {
  console.log(`JSON Server is running: http://localhost:3004`);
});
