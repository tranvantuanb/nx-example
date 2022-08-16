export enum ConnectionEvent {
  StateChange = 'state_change',
  Initialized = 'initialized',
  Connecting = 'connecting',
  Connected = 'connected',
  Disconnected = 'disconnected',
  Unavailable = 'unavailable',
  Failed = 'failed',
}

export type ConnectionStatus = {
  previous: Exclude<ConnectionEvent, ConnectionEvent.StateChange>;
  current: Exclude<ConnectionEvent, ConnectionEvent.StateChange>;
};

export interface WsData<T> {
  event: string;
  channel: string;
  data: T;
}
