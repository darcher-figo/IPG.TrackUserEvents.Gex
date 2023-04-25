/// <reference types="gtag.js" />
/// <reference types="node" />
export declare function dispatchEvent(
	event_name: Gtag.EventNames,
	event_data: Partial<Gtag.EventParams>,
): void;
export declare function trackPageView(
	page_href: URL,
	gtm_token: string & keyof NodeJS.ProcessEnv,
): void;
declare const _default: {
	readonly dispatchEvent: typeof dispatchEvent;
	readonly trackPageView: typeof trackPageView;
};
export default _default;
