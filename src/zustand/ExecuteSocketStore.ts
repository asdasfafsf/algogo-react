import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

type ExecuteSocketStore = {
  socket: Socket | null;
  state: SocketState;
  connect: () => Promise<SocketState>;
  disconnect: () => void;
  run: (data: RequestExecuteList) => Promise<ResponseExecuteResult>;
  execute: (
    handler: (executeResult: ResponseExecuteResult) => Promise<void> | void)
  => Promise<void> | void;
};

export const useExecuteSocketStore = create<ExecuteSocketStore>((set, get) => ({
  socket: null,
  state: 'DISCONNECTED',
  connect: () => new Promise<SocketState>((resolve, reject) => {
    get()?.socket?.disconnect();

    const url = location.host.replace('5173', '3001');
    const { protocol } = location;

    const wsUrl = protocol === 'http:' ? `ws://${url}` : `wss://${url}`;

    const socket = io(wsUrl, {
      autoConnect: false,
      transports: ['websocket'],
    });
    socket.on('auth', async (data) => {
      if (data.code !== '0000') {
        if (data.code === 'JWT_EXPIRED') {
          socket.disconnect();
          set({ socket: null, state: 'JWT_EXPIRED' });
          resolve('JWT_EXPIRED');
        }
      }
      set({ state: 'WAITING' });
      resolve('WAITING');
    });

    socket.on('connect', async () => {
      set({ socket });
    });

    socket.on('connect_error', (error) => {
      reject(error); // 연결 실패 시 reject 호출
    });

    socket.on('disconnect', () => {
      set({ socket: null, state: 'DISCONNECTED' });
    });

    socket.connect();
    socket.emit('auth', { token: localStorage.getItem('accessToken') });
  }),

  disconnect: () => {
    get()?.socket?.disconnect();
  },

  run: async (data) => {
    const { socket } = get();

    return new Promise((resolve) => {
      if (socket) {
        const handleError = async () => {
          socket.off('error');
          socket.on('error', (data) => {
            set({ state: 'WAITING' });
            resolve(data);
          });
        };

        set({ state: 'PENDING' });
        handleError();

        socket.emit('execute', data, async (response: ResponseExecuteResult) => {
          set({ state: 'WAITING' });
          resolve(response);
        });
      }
    });
  },

  execute: async (handler) => {
    const { socket } = get();
    if (!socket?.hasListeners('executeResult')) {
      socket?.removeAllListeners('executeResult');
    }
    socket?.on('executeResult', handler);
  },
}));
