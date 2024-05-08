// NOde server that will handel io socket conneciton.

const io= require('socket.io')(8000)

const users={};

io.on('connection',socket=>{
    //if new user joins, other users connected to the server will get to know
    socket.on('new-user-joined',nam=>{
        console.log("new user", nam);
        users[socket.id]=nam;
        socket.broadcast.emit('user-joined',nam);
    });

    //someone  sends message
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, nam: users[socket.id]})
    });

    //leaves the chat
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });



})

