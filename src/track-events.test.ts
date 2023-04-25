import { dispatchEvent, trackPageView } from "./track-events";

const envVars = process.env; //? required for trackPageView args
const { fn, mock, resetAllMocks, resetModules } = jest;
const { GA_TOKEN = "G-OOGLETOKEN" } = envVars;

mock("./track-events", () => {
	return {
		dispatchEvent: fn(),
		trackPageView: fn(),
	};
});

beforeEach(() => {
	resetModules();
	globalThis.gtag = fn();
	globalThis.console.error = fn();
	process.env.GTM_TOKEN_ID = GA_TOKEN;
});

afterEach(() => {
	process.env = envVars;
	resetAllMocks();
});

describe("runs trackPageView tracking method", () => {
	const url = new URL("/onepack", "https://www.petpartners.com");
	test("should emit a page viewed event", () => {
		trackPageView(url, "GTM_TOKEN_ID");
		expect(gtag).toBeCalledTimes(1);
	});
	test("should emit an error in console", () => {
		trackPageView(url, "");
		expect(console.error).toBeCalledTimes(1);
	});
});

describe("runs dispatchEvent tracking method", () => {
	test("should emit an action event", () => {
		dispatchEvent("view_item", {
			event_category: "cta",
			event_label: "btn",
			value: 12,
		});
		expect(gtag).toBeCalledTimes(1);
	});
});
