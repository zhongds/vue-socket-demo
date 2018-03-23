const path = require('path');
const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
// const serve = require('koa-static');
// const Router = require('koa-router');
// const router = new Router();

// const namespaces = [];
// router.get('/login', (ctx, next) => {
//   console.log('login ctx', ctx);
// }).get('/join-io', (ctx, next) => {
//   const { namespace } = ctx.query;
//   let io;
//   if(namespaces.indexOf(namespace) === -1) {
//     console.log('只应该进来一次');
//     const io = io.of(`/${namespace}`);
//     registerSocketEvents(io);
//     namespaces.push(namespace);
//   }
//   ctx.body = 'success';
// }).get('/', (ctx, next) => {
//   console.log('root router', ctx);
// })

// const clientFiles = serve(path.join(__dirname, '../client'));
// clientFiles._name = 'static/client';
// app.use(clientFiles);

// app.use(router.routes()).use(router.allowedMethods());



// key: roomName, value: numUsers
const roomMap = {};

const socketUser = {};

io.on('connection', function(socket){
  socket.on('login', function ({username}) {
    let data;
    if(!Object.keys(socketUser).includes(username)) {
      data = {status: 200, username};
      socketUser[username] = socket.id;
    } else {
      data = {status: 400, message: '名字重复，请重新输入'};
    }
    socket.emit('login', data);
  })

  socket.on('join room', function (data) {
    socket.join(data.roomName, function () {
      // we store the username in the socket session for this client
      socket.username = data.username;
      socket.room = data.roomName;
      roomMap[socket.room] ? ++roomMap[socket.room] : roomMap[socket.room] = 1;
      // echo globally (all clients) that a person has connected
      // 房间内所有人都能收到信息，包括自己
      io.to(data.roomName).emit('join room', {
        roomName: data.roomName,
        numUsers: roomMap[socket.room],
        username: data.username
      })
      // 房间内所有人都能收到信息，除了自己
      // socket.broadcast.to(data.roomName).emit('join room', {
      //   numUsers: roomMap[socket.room],
      //   roomName: data.roomName
      // });
    });  
  })

  socket.on('leave room', function() {
    leaveRoom(socket);
  })

  socket.on('new message', function (message) {
    io.to(socket.room).emit('new message', {
      roomName: socket.room,
      username: socket.username,
      message
    });
  })

  socket.on('new private message', function (data) {
    const socketId = socketUser[data.chatUser];
    socket.to(socketId).emit('new private message',data);
  })

  socket.on('disconnect', function() {
    leaveRoom(socket);
    delete socketUser[socket.username];
  });
  
});

function leaveRoom(socket) {
  socket.leave(socket.room, function () {
    console.log(`${socket.username} leave ${socket.room}`);
    // io.sockets.in(roomid).emit('system','hello,'+data+'加入了房间');//包括自己
    --roomMap[socket.room];
    io.to(socket.room).emit('leave room', {
      roomName: socket.room,
      username: socket.username,
      numUsers: roomMap[socket.room],
    });
    socket.room = null;      
  })
}

const port = process.env.PORT || 3003;
server.listen(port, function() {
  console.log(`Server is listening on ${port}`);
});