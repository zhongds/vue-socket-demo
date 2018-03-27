<template>
  <div class="content" v-if="data.length" ref="chat-content">
    <template v-for="(item, index) in data">
      <div :class="{row: true, me: item.username === username}" v-if="item.type === 'chat-content'" :key="index + 1">
        <img :src="photo" alt="头像">
        <div class="message">
          <div 
            class="username" 
            @click="chatToUser(item.username)"
          >
            {{item.username}}
          </div>
          <div class="messageBody">
            <div :class="{plain: true, left: item.username !== username, right: item.username === username}">{{item.message}}</div>
          </div>
        </div>
      </div>
      <div class="row tip" v-if="item.type === 'tip'" :key="index + 1">{{item.message}}</div>
    </template>
  </div>
</template>

<script>
import photo from '@/assets/images/photo.jpg'

export default {
  name: 'chat-content',
  props: {
    data: Array,
    username: String,
    isPrivate: Boolean,
  },
  data() {
    return {
      photo,
    }
  },
  methods: {
    chatToUser(chatUser) {
      if(!isPrivate && chatUser !== this.username) {
        this.$router.push({name: 'private-chat', query: {chatUser}});        
      }
    }
  }
}
</script>


<style scoped>
  .content {
    height: 100%;
    overflow: auto;
    padding: 0 10px;
  }

  .row {
    overflow: hidden;
    padding: 5px 0;
    width: 100%;
    vertical-align: top;
  }

  .me {
    text-align: right;
    float: right;
  }

  .row img {
    width: 40px;
    height: 40px;
    vertical-align: top;
    float: left;
  }

  .row.me img {
    float: right;
  }

  .message {
    overflow: hidden;
  }

  .username {
    font-weight: 400;
    font-size: 12px;
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #4f4f4f;   
  }

  .username a {
    text-decoration: none;
  }

  .messageBody {
    position: relative;
    word-break: break-all;
    word-wrap: break-word;
    padding: 9px 13px;
    background: #fff;
    margin: 0 10px;
    border-radius: 4px;
    display: inline-block;
    text-align: left;
    font-size: 14px;
  }

  .row.me .messageBody {
    background: #b2e281;    
  }

  .tip {
    text-align: center;
    width: 80%;
    margin: 0 auto;
    color: #ccc;
  }

  .plain::before, .plain::after {
    position: absolute;
    top: 10px;
    border: 6px solid transparent;
    content: " ";
  }

  .plain.left::before {
    border-right-color: #fff;
    border-right-width: 4px;
    right: 100%;
  }
  .plain.right::after {
    border-left-color: #b2e281;
    border-left-width: 4px;
    left: 100%;
  }
</style>


