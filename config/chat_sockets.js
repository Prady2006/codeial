module.exports.chatSockets = function(chatServer) {
    const io = require('socket.io')(chatServer);

    io.sockets.on('connection',function(socket){
        // console.log('new connection received', socket);

        socket.on('disconnect',function(){
            console.log('connection disconnected');
        });

        socket.on('join_room',function(data){
            console.log('joining req received :',data);

            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);  

            socket.on('send_message',function(data){
                io.in(data.chatroom).emit('receive_message',data);
            });
        })
    });
}