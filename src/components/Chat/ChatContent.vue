<template>
  <ul class="content" v-if="data.length">
    <template v-for="(item, index) in data">
      <li class="row" v-if="item.type === 'chat-content'" :key="index + 1">
        <span class="username">{{item.username}}</span>
        <span class="messageBody">{{item.message}}</span>
      </li>
      <li class="row tip" v-if="item.type === 'tip'" :key="index + 1">{{item.message}}</li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'chat-content',
  props: {
    data: Array
  }
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
    color: #4CAF50;
    width: calc(20% - 20px);
    float: left;
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
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
</style>


