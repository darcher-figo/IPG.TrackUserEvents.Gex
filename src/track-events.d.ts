/// <reference types="gtag.js" />

declare module "gtag.js";

export type TokenId = string & keyof NodeJS.ProcessEnv;
export type EventName = Gtag.EventNames;
export type EventData = Partial<Gtag.EventParams>;
