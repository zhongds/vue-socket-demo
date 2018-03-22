<template>
  <router-view></router-view>
</template>

<script>
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
    chat: isPrivate ? RoomChat : PrivateChat
  }
}
</script>

