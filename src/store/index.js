import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    private: {},
    public: {}
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
      console.log('change username success');
    },
    addPrivateMessage(state, {chatUser, data}) {
      const privateObj = state.private;
      if (!privateObj[chatUser]) {
        privateObj[chatUser] = [];              
      }
      privateObj[chatUser].push(data);
      state.private = { ...privateObj };
    },
    deletePrivateMessage(state, chatUser) {
      delete state.private[chatUser];
    },
    addPublicMessage(state, {roomName, numUsers, data}) {
      const publicObj = state.public;
      if (!publicObj[roomName]) {
        publicObj[roomName] = {
          numUsers: 0,
          data: []
        };
      }
      if (numUsers) publicObj[roomName].numUsers = numUsers;
      publicObj[roomName].data.push(data);
      state.public = { ...publicObj };
    },
    deletePublicMessage(state, roomName) {
      delete state.public[roomName];
    },
  }
})
