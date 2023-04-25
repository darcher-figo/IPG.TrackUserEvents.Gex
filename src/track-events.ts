import type { EventData, EventName, TokenId } from "./track-events.d";

export function dispatchEvent(
	event_name: EventName,
	event_data: EventData,
): void {
	globalThis.gtag("event", event_name, event_data);
}

export function trackPageView(page_href: URL, gtm_token: TokenId): void {
	try {
		const page_path = page_href;
		const token = process.env[gtm_token];
		if (!token) {
			throw new Error("missing GA4/GT token ID environment variable");
		}
		globalThis.gtag("config", `${token}`, { page_path });
	} catch (err) {
		console.error(err);
	}
}

export default {
	dispatchEvent,
	trackPageView,
} as const;
