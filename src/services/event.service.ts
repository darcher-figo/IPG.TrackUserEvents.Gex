import ReactGA, { EventArgs } from 'react-ga';

type GAProps<T extends EventArgs = { action: string; category: string; }> = T & {
  token: string;
  transact: string & 'buffer' | 'xhr' | 'image';
  nonInteraction: boolean & (string & ("false" | "true")) & (number & (0 | 1));
};

class Analtyics {
  readonly opts: GAProps<EventArgs & { token: string; }> = {
    token: process.env.GA_TRACKING_TOKEN || '',
    transact: 'xhr',
    nonInteraction: false
  };

  // TODO: compile list of categories & actions
  trackEvent<EventProps extends EventArgs = EventArgs>(args: EventProps) {
    const { token, transact, nonInteraction }: GAProps = this.opts;
    ReactGA.initialize(process.env.GA_TRACKING_TOKEN as string);

    (dataLayer || []).push({ 'event': 'new_subscriber' });

    return ReactGA.event(args);
  }

  async pageView() {
    const ReactGA = await import('react-ga');
    ReactGA.initialize(this._TOKEN);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}

export default Analtyics;
