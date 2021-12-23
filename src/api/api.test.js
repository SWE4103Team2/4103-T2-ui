const api = require("./api");

describe("testing api.js", () => {
    test("testing api headers", () => {
        expect(api.default.defaults.headers).toMatchObject({"Access-Control-Allow-Origin": "*"});
    })
});