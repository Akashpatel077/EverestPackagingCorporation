import {io, Socket} from 'socket.io-client';
import {EventRegister} from 'react-native-event-listeners';

class SocketServer {
  socket: Socket;
  constructor() {
    this.socket = [];
  }

  initializeSocket(uid: number) {
    console.log('uid :::-', uid);

    this.socket = io('https://bright-mouse-93.telebit.io/', {
      path: '/socket.io',
      autoConnect: false,
      query: {
        userID: uid,
      },
      transports: ['websocket'],
    });
  }
  online_offline_status = async (status: string) => {
    this.socket.connect();
    this.socket.on('connect', () => {
      this.socket.emit('appStatus', status);
    });
  };
  userOnlineId = async () => {
    return this.socket.on('online', (user_id: any) => {
      EventRegister.emit('online_event', user_id);
    });
  };

  userOfflineId = async () => {
    return this.socket.on('offline', async (user_id: any) => {
      EventRegister.emit('offline_event', user_id);
    });
  };

  socketConnect = async () => {
    this.socket.connect();
    this.socket.on('connect', () => {
      console.log('Socket Connected');
    });
  };

  getnewMessage_notify = async () => {
    this.socket.connect();
    return this.socket.on('new message', message_alert => {
      EventRegister.emit('NewMessage', message_alert);
    });
  };

  getcountMessage_badge = async () => {
    this.socket.connect();
    return this.socket.on('message_pending', message_alert => {
      EventRegister.emit('NewMessagecount', message_alert);
    });
  };

  socketEmit = async (msg: string, uid: number) => {
    console.log('uid', uid);

    this.socket.connect();
    this.socket.on('connect', async () => {
      this.socket.emit(msg, uid);
    });
  };

  sendNotificatin = (
    type: string,
    to_user_id: number,
    from_user_id: number,
  ) => {
    this.socket.connect();
    this.socket.on('connect', () => {
      this.socket.emit('sendNotif', type, to_user_id, from_user_id);
    });
  };

  socketDisConnect = () => {
    this.socket.disconnect();
  };

  chatSocket(uid: number, roomId: any, type: any, internet_status: number) {
    console.log('Chat Socket ::::-', uid, roomId, internet_status);

    this.socket = io('https://bright-mouse-93.telebit.io/chat', {
      path: '/socket.io',
      transports: ['websocket'],
      requestTimeout: 50000,
      query: {
        userID: uid,
        room_id: roomId,
        message_type: type,
        internet_status,
      },
    });
  }

  sendMessage = (
    roomId: any,
    message: string,
    type: any,
    message_id: any,
    userID_other: number,
    internet_status: number,
  ) => {
    // this.socket.connect();
    this.socket.on('connect', () => {
      const data = this.socket.emit(
        roomId,
        message,
        type,
        message_id,
        userID_other,
        internet_status,
      );
      console.log('data123456', data);
    });
  };

  getmessage = (roomid: any) => {
    return this.socket.on(roomid, (get_single_last_msg: any) => {
      EventRegister.emit('myCustomEvent', get_single_last_msg);
    });
  };

  messageSocketEmit = async (msg: string, userId: number) => {
    this.socket.connect();

    this.socket.on('connect', async () => {
      this.socket.emit(msg, userId);
    });
  };

  unreadsocket = (from_user_id: any, room_id: any, unread_count: any) => {
    console.log('from_user_id;;;;;;;;;', from_user_id, room_id, unread_count);

    this.socket.on('connect', async () => {
      this.socket.emit('UnreadMessages', from_user_id, room_id, unread_count);
    });
  };

  getseenmessage = async () => {
    this.socket.connect();
    return this.socket.on('seenmsgID', (unreadmsgID, userID_other) => {
      console.log('seenmsgID', unreadmsgID, userID_other);
      EventRegister.emit('seenmsgID', unreadmsgID);
    });
  };
}
export {SocketServer};
