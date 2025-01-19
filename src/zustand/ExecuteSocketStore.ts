import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import useMeStore from './MeStore';


type SocketState = 'PENDING' | 'WAITING' | 'DISCONNECTED' | 'TOKEN_EXPIRED';
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
    const url = location.host.replace('5173', '3001');
    const { protocol } = location;

    const wsUrl = protocol === 'http:' ? `ws://${url}` : `wss://${url}`;

    const socket = io(wsUrl, {
      autoConnect: false,
      transports: ['websocket'],
    });
    socket.on('auth', async (data) => {
      console.log(data)
      if (data.code !== '0000') {
        if (data.code === 'JWT_EXPIRED') {
          socket.disconnect();
          set({ socket: null, state: 'TOKEN_EXPIRED'});
          resolve('TOKEN_EXPIRED')
        }
      }
      set({ state: 'WAITING' });
      resolve('WAITING');
    });

    socket.on('connect', async () => {
      set({ socket });
    });

    socket.on('connect_error', (error) => {
      console.error(error)
      reject(error); // 연결 실패 시 reject 호출
    });

    socket.on('error', (error) => {
      console.log(error);
      console.log('오류는여기양')

      socket.emit('execute', error);
    })

    socket.on('disconnect', () => {
      set({ socket: null, state: 'DISCONNECTED' });
    });

    socket.connect();
    socket.emit('auth', { token: localStorage.getItem('accessToken')});
  }),

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      set({ socket: null, state: 'DISCONNECTED' });
      socket.disconnect();
    }
  },

  run: async (data) => {


    let { socket } = get();

    if (!socket || socket.disconnected) {
      const { connect } = get();
      let result = await connect();
      if (result === 'TOKEN_EXPIRED') {
        await useMeStore.getState().refresh();
        result = await connect();
      }

      socket = get().socket;
    }

    return new Promise(async (resolve, reject) => {
      if (socket) {
        const handleError = async () => {
          socket.off('error');
          socket.on('error', (data) => {
            set({ state: 'WAITING' });
            resolve(data);
          });
        }

        set({ state: 'PENDING' });
        await handleError();
  
        socket.emit('execute', data, async (response: ResponseExecuteResult) => {
          resolve(response);
          set({ state: 'WAITING' });
        });
      }
    })


  },

  execute: async (handler) => {
    const { socket } = get();
    if (!socket?.hasListeners('executeResult')) {
      socket?.on('executeResult', handler); // 실행 응답을 받아 처리
    }
  },
}));
