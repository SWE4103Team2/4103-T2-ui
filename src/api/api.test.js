const api = require("./api");

describe("testing api headers", () => {
    test("testing api headers", () => {
        expect(api.default.defaults.headers).toMatchObject({"Access-Control-Allow-Origin": "*"});
    })
});