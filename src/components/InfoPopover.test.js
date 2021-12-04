const { expect } = require('@jest/globals');
const InfoPopover  = require('./InfoPopover');

describe("testing InfoPopover.js", () => {
    test("testing direction", () => {
        expect(InfoPopover.default.defaultProps.direction).toBe('left');
    }),
    test("testing parameters", () => {
        const test = InfoPopover.default({ info: 'jest message', direction: 'left' });
        expect(test.props).toMatchObject({"placement": "left"});
        expect(test.props).toMatchObject({"title": "jest message"});
    })
});