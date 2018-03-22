<template>
  <div class="login">
    <h1>CHAT ROOM</h1>
    <h2>please set your display name first!</h2>
    <input type="text" ref="username-input" @keyup.enter="inputEnter">
  </div>
</template>

<script>
export default {
  name: 'login',
  mounted() {
    this.$refs['username-input'].focus();
    this.$socket.on('login', (data) => {
      if(data.status === 200) {
        this.$store.commit('setUsername', data.username);
        this.$router.push('/');
      } else {
        alert(data.message);
      }
    })
  },
  methods: {
    inputEnter(e) {
      const value = e.target.value;
      if (value) {
        this.$socket.emit('login', {
          username: value,
        })
      }
    },
  }
}
</script>

<style scoped>
  .login {
    height: 100%;    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #000;
    color: #fff;
  }

  h2 {
    text-align: center;
  }

  input {
    width: 80%;
    height: 40px;
    font-size: 40px;
    margin-top: 10px;
    background: #000;
    border: 0;
    border-bottom: 2px solid #fff;
    color: #fff;
    outline: none;
    text-align: center;
    padding: 15px;
  }
</style>

