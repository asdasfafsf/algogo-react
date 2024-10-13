import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

type ExecuteSocketStore = {
  socket: Socket | null;
  connect: (url: string) => Promise<void>;
  disconnect: () => void;
  auth: () => Promise<void>;
  execute: (data: any) => Promise<void>;
  setMessageHandler: (handler: (response: any) => void) => void;
};

export const useExecuteSocketStore = create<ExecuteSocketStore>((set, get) => ({
  socket: null,

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
        resolve();
      }, 2000);
    });

    socket.on('connect_error', (error) => {
      reject(error); // 연결 실패 시 reject 호출
    });

    socket.on('disconnect', () => {
      set({ socket: null });
    });
  }),

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
      console.log('WebSocket 연결 해제됨');
    }
  },

  auth: () => new Promise<void>((resolve) => {
    const { socket } = get();

    socket?.emit('auth', {
      token: localStorage.getItem('accessToken'),
    }, () => resolve());
  }),

  execute: async (data) => {
    const { socket } = get();
    if (socket) {
      socket.emit('execute', data, (response: any) => {
        console.log(response);
      });
    }
  },

  setMessageHandler: (handler: (response: any) => void) => {
    const { socket } = get();
    if (socket) {
      socket.on('executeResponse', handler); // 실행 응답을 받아 처리
    }
  },
}));
