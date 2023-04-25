"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackPageView = exports.dispatchEvent = void 0;
function dispatchEvent(event_name, event_data) {
    globalThis.gtag("event", event_name, event_data);
}
exports.dispatchEvent = dispatchEvent;
function trackPageView(page_href, gtm_token) {
    try {
        var page_path = page_href;
        var token = process.env[gtm_token];
        if (!token) {
            throw new Error("missing GA4/GT token ID environment variable");
        }
        globalThis.gtag("config", "".concat(token), { page_path: page_path });
    }
    catch (err) {
        console.error(err);
    }
}
exports.trackPageView = trackPageView;
exports.default = {
    dispatchEvent: dispatchEvent,
    trackPageView: trackPageView,
};
