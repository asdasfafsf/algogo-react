import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import useMeStore from './MeStore';

type ExecuteSocketStore = {
  socket: Socket | null;
  state: 'PENDING' | 'WAITING' | 'DISCONNECTED';
  connect: () => Promise<void>;
  disconnect: () => void;
  run: (data: RequestExecuteList
    , handler: (response: ResponseExecuteResult) => Promise<void> | void) => Promise<void> | void;
  execute: (
    handler: (executeResult: ResponseExecuteResult) => Promise<void> | void)
  => Promise<void> | void;
};

export const useExecuteSocketStore = create<ExecuteSocketStore>((set, get) => ({
  socket: null,
  state: 'DISCONNECTED',
  connect: () => new Promise<void>((resolve, reject) => {
    const url = location.host.replace('5173', '3001');
    const { protocol } = location;

    const wsUrl = protocol === 'http:' ? `ws://${url}` : `wss://${url}`;

    const socket = io(wsUrl, {
      autoConnect: false,
      transports: ['websocket'],
    });
    socket.on('auth', async (data) => {
      console.log('auth', data);
      if (data === 'UNAUTHORIZED') {
        await useMeStore.getState().refresh();
        socket?.emit('auth', { token: localStorage.getItem('accessToken') });
        return;
      }

      set({ state: 'WAITING' });
      resolve();
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
  }),

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.off('execute');
      socket.disconnect();
    }
  },

  run: async (data, handler) => {
    let { socket } = get();

    if (!socket || socket.disconnected) {
      const { connect } = get();
      await connect();
      socket = get().socket;
    }

    if (socket) {
      set({ state: 'PENDING' });
      socket.emit('execute', data, async (response: ResponseExecuteResult) => {
        if (response.code !== '0000') {
          await handler(response);
        }
        set({ state: 'WAITING' });
      });
    }
  },

  execute: async (handler) => {
    const { socket } = get();
    if (socket?.connected) {
      socket.on('executeResult', handler); // 실행 응답을 받아 처리
    }
  },
}));
