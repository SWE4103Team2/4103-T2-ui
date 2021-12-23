const home = require('./Home');

describe("testing Home.js", () => {
    test("testing valid user", () => {
        const test = home.Home({user: { username: 'admin', password: 'admin'}});
        expect(JSON.stringify(test.props.children[0])).toContain("\"Hello, \",\"admin\"");
    }),
    test("testing invalid user", () => {
        const test = home.Home({user: { username: '', password: ''}});
        expect(JSON.stringify(test.props.children[0])).toContain("\"Oh no! You dont have a username, what are we going to do?!\"");
    })
});