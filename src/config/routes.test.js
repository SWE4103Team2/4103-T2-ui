const routes = require('./routes');

describe("testing routes.js", () => {
    test("testing home route", () => {
        expect(routes.ROUTE_HOME).toBe('/');
    }),
    test("testing login route", () => {
        expect(routes.ROUTE_LOGIN).toBe('/login');
    }),
    test("testing student route", () => {
        expect(routes.ROUTE_STUDENTS).toBe('/students');
    }),
    test("testing file upload route", () => {
        expect(routes.ROUTE_FILEUPLOAD).toBe('/fileupload');
    })
});