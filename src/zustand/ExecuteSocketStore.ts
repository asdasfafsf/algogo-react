import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

type ExecuteSocketStore = {
  socket: Socket | null;
  state: 'PENDING' | 'WAITING' | 'DISCONNECTED';
  connect: () => Promise<void>;
  disconnect: () => void;
  auth: () => Promise<void>;
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
    socket.on('auth', async () => {
      set({ state: 'WAITING' });
      resolve();
    });

    socket.on('connect', async () => {
      set({ socket });
      const { auth } = get();
      await auth();
    });

    socket.on('connect_error', (error) => {
      reject(error); // 연결 실패 시 reject 호출
    });

    socket.on('disconnect', () => {
      set({ state: 'DISCONNECTED' });
      set({ socket: null });
    });

    socket.connect();
  }),

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
    }
  },

  auth: () => new Promise<void>((resolve) => {
    const { socket } = get();

    socket?.emit('auth', {
      token: localStorage.getItem('accessToken'),
    }, () => resolve());
  }),

  run: async (data, handler) => {
    let { socket } = get();

    if (!socket || !socket.connected) {
      const { connect } = get();
      await connect();
      socket = get().socket;
    }

    if (socket) {
      set({ state: 'PENDING' });
      socket.emit('execute', data, async (response: ResponseExecuteResult) => {
        await handler(response);
        set({ state: 'WAITING' });
        socket.off('execute');
      });
    }
  },

  execute: (handler) => {
    const { socket } = get();
    if (socket) {
      socket.on('execute', handler); // 실행 응답을 받아 처리
    }
  },
}));
