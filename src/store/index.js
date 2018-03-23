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
      if (!state.private[chatUser]) {
        state.private[chatUser] = [];              
      }
      state.private[chatUser].push(data);      
    },
    deletePrivateMessage(state, chatUser) {
      delete state.private[chatUser];
    },
    addPublicMessage(state, {roomName, numUsers, data}) {
      if (!state.public[roomName]) {
        state.public[roomName] = {
          numUsers: 0,
          data: []
        };
      }
      if (numUsers) state.public[roomName].numUsers = numUsers;
      state.public[roomName].data.push(data);
      // state.public = {roomName, numUsers, data: []}
      console.log('===========晚了', state);
    },

    changePublic(state) {
      state.public = {name: '123'};
      console.log('change public success 2333');
    },
    deletePublicMessage(state, roomName) {
      delete state.public[roomName];
    },
  }
})
