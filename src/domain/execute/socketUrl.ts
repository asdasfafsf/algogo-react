type SocketLocation = {
  host: string;
  protocol: string;
};

export function createExecuteSocketUrl(
  environment: string | undefined,
  location: SocketLocation,
): string {
  if (environment === 'development') {
    return 'ws://localhost:3001';
  }

  const protocol = location.protocol === 'http:' ? 'ws:' : 'wss:';
  return `${protocol}//${location.host}`;
}
