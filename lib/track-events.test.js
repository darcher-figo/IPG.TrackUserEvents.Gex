"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var track_events_1 = require("./track-events");
var envVars = process.env; //? required for trackPageView args
var fn = jest.fn, mock = jest.mock, resetAllMocks = jest.resetAllMocks, resetModules = jest.resetModules;
var _a = envVars.GA_TOKEN, GA_TOKEN = _a === void 0 ? "G-OOGLETOKEN" : _a;
mock("./track-events", function () {
    return {
        dispatchEvent: fn(),
        trackPageView: fn(),
    };
});
beforeEach(function () {
    resetModules();
    globalThis.gtag = fn();
    globalThis.console.error = fn();
    process.env.GTM_TOKEN_ID = GA_TOKEN;
});
afterEach(function () {
    process.env = envVars;
    resetAllMocks();
});
describe("runs trackPageView tracking method", function () {
    var url = new URL("/onepack", "https://www.petpartners.com");
    test("should emit a page viewed event", function () {
        (0, track_events_1.trackPageView)(url, "GTM_TOKEN_ID");
        expect(gtag).toBeCalledTimes(1);
    });
    test("should emit an error in console", function () {
        (0, track_events_1.trackPageView)(url, "");
        expect(console.error).toBeCalledTimes(1);
    });
});
describe("runs dispatchEvent tracking method", function () {
    test("should emit an action event", function () {
        (0, track_events_1.dispatchEvent)("view_item", {
            event_category: "cta",
            event_label: "btn",
            value: 12,
        });
        expect(gtag).toBeCalledTimes(1);
    });
});
