import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

type ExecuteSocketStore = {
  socket: Socket | null;
  connect: (url: string) => Promise<void>;
  disconnect: () => void;
  execute: (data: any, callback: (response: any) => void) => Promise<void>;
  setMessageHandler: (handler: (response: any) => void) => void;
};

export const useExecuteSocketStore = create<ExecuteSocketStore>((set, get) => ({
  socket: null,

  connect: (url: string) => new Promise<void>((resolve, reject) => {
    const socket = io(url, {
      autoConnect: true,
      transports: ['websocket'],
      extraHeaders: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    socket.on('connect', () => {
      set({ socket });
      resolve(); // 연결 성공 시 resolve 호출
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

  execute: async (data, callback) => {
    let { socket } = get();

    if (!socket) {
      console.log('Socket is not connected, trying to connect...');
      await get().connect('ws://localhost:3001'); // 연결 시도
      socket = get().socket;
    }

    if (socket) {
      console.log('execute');
      socket.send('execute', data, (response: any) => {
        console.log(response);
        callback(response);
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
