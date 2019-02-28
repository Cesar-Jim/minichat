const app = require("../../app");
const chat = require("../../public/chat");
const base = "http://localhost:5000";

describe("app", () => {
  describe("GET /", () => {
    it("should render the main view", done => {
      app.get(`${base}`, (err, res, body) => {
        expect(body).toContain("Mini");
        done();
      });
    });
  });
});
