import store from './store'
import * as io from 'socket.io-client'

const socket = io('http://localhost:3003')

console.log('store', store);
socket.on('join room', ({roomName, numUsers, username}) => {
  addPublicMessage({
    roomName,
    numUsers,
    username,
    message: `${username} join room`,
    type: 'tip',
  })
});
socket.on('leave room', ({roomName, numUsers, username}) => {
  addPublicMessage({
    roomName,
    numUsers,
    username,
    message: `${username} leave room`,
    type: 'tip',
  })
});
socket.on('new message', ({roomName, message, username}) => {
  addPublicMessage({
    roomName,
    username,
    message,
    type: 'chat-content',
  })
});

socket.on('new private message', (data) => {
  addPrivateMessage(data)
});

socket.on('disconnect', () => {
  console.log(`you have been remove chat room`)
});

socket.on('reconnect', () => {
  console.log(`you have been reconnected`)
});

export function addPrivateMessage(params) {
  const {chatUser, username, message} = params;
  const data = {
    username,
    datetime: Date.now(), //后续要格式化
    message,
    type: 'chat-content',
  }
  store.commit('addPrivateMessage', {
    chatUser: chatUser || username, //chatUser存在的时候，是给别人发的；不存在的时候，是接收到别人发过来的
    data,
  })
}

function addPublicMessage(params) {
  const {roomName, numUsers, username, message, type} = params;
  const data = {
    username,
    datetime: Date.now(), //后续要格式化
    message,
    type,
  }
  store.commit('addPublicMessage', {
    roomName, 
    numUsers, 
    data,
  })
}

export default socket;
