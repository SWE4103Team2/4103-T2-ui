const app = require('./App');

describe("testing App.js", () => {
    test("testing app theme type", () => {
        expect(JSON.stringify(app.default())).toContain("\"type\":\"light\"");
        expect(JSON.stringify(app.default())).toContain("\"main\":\"#870000\",\"light\":\"#870000\",\"dark\":\"#870000\",\"contrastText\":\"#fff\"");
    })
});