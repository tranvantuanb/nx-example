import Echo, { PresenceChannel } from 'laravel-echo';
import Pusher from 'pusher-js';
import PusherBatchAuthorizer from 'pusher-js-auth';
import { Dispatch } from 'redux';
import { CommonConstants, CoreInterfaces } from '@carro/utils';
import { getAccessToken } from '@carro/utils/helpers/auth';
import { actions } from './slice';
declare global {
  interface Window {
    __ECHO_MANAGER__: EchoManager;
    __ECHO_MANAGER_SNEAKING__: EchoManager;
  }
}

const RETRY_INTERVAL = 3000;

export class EchoManager {
  private static instance: EchoManager;
  private _pusher: typeof Pusher | null = null;
  private _echo: Echo | null = null;
  private _connectionStatus: CoreInterfaces.ConnectionStatus | null = null;
  private _listeningEvents: { [eventKey: string]: boolean } = {};
  private _authParams?: Record<string, any> & { sneaking: boolean };
  public onDispatch?: Dispatch;

  /**
   * Get Echo Manager instance
   */
  public static getInstance(): EchoManager {
    if (!EchoManager.instance) {
      EchoManager.instance = new EchoManager();
    }
    return EchoManager.instance;
  }

  /**
   * Initialize connection to websocket server
   */
  initialize(
    options?: { authParams?: any } | never,
    onDispatch?: Dispatch
  ): void {
    if (!CommonConstants.ECHO_KEY || !CommonConstants.ECHO_HOST) {
      return;
    }

    const accessToken = getAccessToken();

    if (!accessToken) {
      // retry until user has logged in
      setTimeout(() => {
        this.initialize({ authParams: options?.authParams });
      }, RETRY_INTERVAL);
      return;
    }

    // initialization
    this._pusher = Pusher;

    this._echo = new Echo({
      authorizer: PusherBatchAuthorizer,
      authDelay: 200,
      broadcaster: 'pusher',
      key: CommonConstants.ECHO_KEY,
      wsHost: CommonConstants.ECHO_HOST,
      wsPort: CommonConstants.ECHO_PORT,
      wssPort: CommonConstants.ECHO_PORT,
      forceTLS: true,
      encrypted: true,
      disableStats: true,
      enabledTransports: ['ws', 'wss'],
      authEndpoint: `${CommonConstants.API_URL}/api/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: options?.authParams || {},
      },
    });
    this._authParams = options?.authParams;
    this.bind(CoreInterfaces.ConnectionEvent.StateChange, this.onStateChange);
    this.onDispatch = onDispatch;
  }

  /**
   * get current Echo connection status
   * @returns CoreInterfaces.ConnectionStatus | null
   */
  getConnectionStatus(): CoreInterfaces.ConnectionStatus | null {
    return this._connectionStatus;
  }

  /**
   * set current Echo connection status
   * @returns void
   */
  setConnectionStatus(status: CoreInterfaces.ConnectionStatus | null) {
    this._connectionStatus = status;
  }

  /**
   * Bind to Echo event
   * @param connectionEvent CoreInterfaces.ConnectionEvent
   * @param callback function to handle on the event
   */
  bind(
    connectionEvent: CoreInterfaces.ConnectionEvent,
    callback: (payload) => void
  ): void {
    this._echo?.connector.pusher.connection.bind(connectionEvent, callback);
  }

  /**
   * Unbind from Echo event
   * @param connectionEvent CoreInterfaces.ConnectionEvent
   * @param callback function to handle on the event
   */
  unbind(
    connectionEvent: CoreInterfaces.ConnectionEvent,
    callback: (payload) => void
  ): void {
    this._echo?.connector.pusher.connection.unbind(connectionEvent, callback);
  }

  /**
   * Listen to websocket private channel's event, once receives data from WS, broadcast
   * it to a CustomEvent
   * @param channel Echo channel name
   * @param event Echo channel's event name
   * @param localEvent local event name
   */
  listen(channel: string, event: string, localEvent: string): void {
    const eventKey = `${channel}_${event}_${localEvent}`;

    if (
      this._connectionStatus?.current !==
        CoreInterfaces.ConnectionEvent.Connected ||
      this._listeningEvents[eventKey]
    ) {
      return;
    }

    try {
      this._echo?.private(channel).listen(event, (payload) => {
        window.dispatchEvent(new CustomEvent(localEvent, { detail: payload }));
      });
      this._listeningEvents[eventKey] = true;
    } catch (e) {
      delete this._listeningEvents[eventKey];
      console.log(`EchoManager error listen ${eventKey}: `, e);
    }
  }

  /**
   * Listen to websocket private presence channel's event, once receives data from WS, broadcast
   * it to a CustomEvent
   * @param channel Echo channel name
   * @param event Echo channel's event name
   * @param localEvent local event name
   */
  listenPresence(channel: string, event: string, localEvent: string): void {
    const eventKey = `${channel}_${event}_${localEvent}`;

    if (
      this._connectionStatus?.current !==
        CoreInterfaces.ConnectionEvent.Connected ||
      this._listeningEvents[eventKey]
    ) {
      return;
    }

    try {
      this._echo?.join(channel).listen(event, (payload) => {
        window.dispatchEvent(new CustomEvent(localEvent, { detail: payload }));
      });

      this._listeningEvents[eventKey] = true;
    } catch (e) {
      delete this._listeningEvents[eventKey];
      console.log(`EchoManager error listen ${eventKey}: `, e);
    }
  }

  /**
   *
   * @param channel
   */
  join(channel: string): PresenceChannel | null {
    try {
      return this._echo?.join(channel) ?? null;
    } catch (e) {
      console.log(`EchoManager error join ${channel}: `, e);
    }

    return null;
  }

  /**
   *
   * @param channel
   */
  leave(channel: string): void {
    try {
      this._echo?.leave(channel);
    } catch (e) {
      console.log(`EchoManager error leave ${channel}: `, e);
    }
  }

  /**
   * Destroy websocket
   */
  destroy(): void {
    this._echo?.connector.pusher.connection.unbind_all();
    this._echo = null;
    this._connectionStatus = null;
    this._listeningEvents = {};
    this._pusher = null;
    // if (appStore) {
    //   appStore.dispatch(CoreActions.echo.updateStatus(null));
    // }
    this.onDispatch?.(actions.echo.updateStatus(null));
    console.log('EchoManager destroy');
  }

  // ### PRIVATE METHODS ###

  /**
   * Handler on connection state change
   */
  private onStateChange(status: CoreInterfaces.ConnectionStatus) {
    console.log('EchoManager status', status.current);
    const echoManager = EchoManager.getInstance();

    echoManager.setConnectionStatus(status);

    this.onDispatch?.(actions.echo.updateStatus(status));

    // Retry if connection error
    if (
      [
        CoreInterfaces.ConnectionEvent.Disconnected,
        CoreInterfaces.ConnectionEvent.Unavailable,
        CoreInterfaces.ConnectionEvent.Failed,
      ].includes(status.current)
    ) {
      echoManager.destroy();
      echoManager.initialize({ authParams: this._authParams });
    }
  }
}
