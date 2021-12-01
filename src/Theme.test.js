const theme = require("./Theme");

describe("testing Theme.js", () => {
    test("testing theme type", () => {
        expect(theme.theme.palette.type).toBe('light');
    }),
    test("testing theme type", () => {
        expect(theme.theme.palette.type).not.toBe('dark');
    }),
    test("testing theme primary colour", () => {
        expect(theme.theme.palette.primary).toStrictEqual({"contrastText": "#fff", "dark": "#870000", "light": "#870000", "main": "#870000"});
    }),
    test("testing theme primary colour", () => {
        expect(theme.theme.palette.primary).not.toStrictEqual({"contrastText": "#fff", "dark": "#000000", "light": "#000000", "main": "#000000"});
    }),
    test("testing theme secondary colour", () => {
        expect(theme.theme.palette.secondary).toStrictEqual({"contrastText": "#fff", "dark": "#000000", "light": "#000000", "main": "#000000"});
    }),
    test("testing theme secondary colour", () => {
        expect(theme.theme.palette.secondary).not.toStrictEqual({"contrastText": "#fff", "dark": "#870000", "light": "#870000", "main": "#870000"});
    })
});