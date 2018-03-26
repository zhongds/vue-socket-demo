<template>
  <ul class="content" v-if="data.length" ref="chat-content">
    <template v-for="(item, index) in data">
      <li class="row" v-if="item.type === 'chat-content'" :key="index + 1">
        <span :class="{username: true, right: item.username === username, textRight: item.username === username}">
          <router-link :to="{name: 'private-chat', query: {chatUser: item.username}}">{{item.username}}</router-link>
        </span>
        <span :class="{messageBody: true, textRight: item.username === username}">{{item.message}}</span>
      </li>
      <li class="row tip" v-if="item.type === 'tip'" :key="index + 1">{{item.message}}</li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'chat-content',
  props: {
    data: Array,
    username: String,
  },
}
</script>


<style scoped>
  .content {
    height: 100%;
    overflow: auto;
  }

  .row {
    overflow: hidden;
    padding: 5px 0;
  }

  .username {
    font-weight: bold;
    font-size: 16px;
    width: calc(20% - 20px);
    float: left;
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .username a {
    color: #4CAF50;
    text-decoration: none;
  }

  .messageBody {
    white-space: normal;
    word-wrap: break-word;
    width: 80%;
    float: right;
  }

  .tip {
    text-align: center;
    width: 80%;
    margin: 0 auto;
    color: #ccc;
  }

  .right {
    float: right;
  }
  .textRight {
    text-align: right;    
  }

</style>


