import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

type ExecuteSocketStore = {
  socket: Socket | null;
  state: 'PENDING' | 'WAITING' | 'DISCONNECTED';
  connect: (url: string) => Promise<void>;
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
  state: 'PENDING',
  connect: (url: string) => new Promise<void>((resolve, reject) => {
    const socket = io(url, {
      autoConnect: true,
      transports: ['websocket'],
    });

    socket.on('connect', async () => {
      set({ socket });
      const { auth } = get();
      setTimeout(async () => {
        await auth();
        set({ state: 'WAITING' });
        resolve();
      }, 2000);
    });

    socket.on('connect_error', (error) => {
      reject(error); // 연결 실패 시 reject 호출
    });

    socket.on('disconnect', () => {
      set({ state: 'DISCONNECTED' });
      set({ socket: null });
    });
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
    const { socket } = get();
    if (socket) {
      socket.emit('execute', data, (response: ResponseExecuteResult) => {
        handler(response);
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
