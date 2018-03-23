<template>
  <private-chat v-if="isPrivate" :username="username" :chatUser="chatUser"></private-chat>
  <room-chat v-else :username="username" :roomName="roomName"></room-chat>
</template>

<script>
import { mapState } from 'vuex'

import RoomChat from './RoomChat';
import PrivateChat from './PrivateChat';
export default {
  name: 'chat',
  props: {
    isPrivate: Boolean,
    chatUser: String,
    roomName: String,
  },
  components: {
    'room-chat': RoomChat,
    'private-chat': PrivateChat
  },
  beforeCreate() {
    if(!this.$store.state.username) {
      this.$router.push({name: 'login'})
    }
  },
  computed: {
    ...mapState([
      'username',
    ])
  },
}
</script>

