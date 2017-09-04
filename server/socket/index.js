export default (io) => {
  io.sockets.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    socket.on('addToRooms', (groupList) => {
      groupList.forEach((group) => {
        socket.join(group);
        console.log(`${socket.id} joined ${group}`);
      });
    });
  });
};
