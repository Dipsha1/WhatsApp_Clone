const socket=io('http://localhost:8000');

const form= document.getElementById('send-container');
const msgInp= document.getElementById('msgInp')
const messageContainer= document.querySelector(".container")

const append=(message,position)=>{
    const messageElemnent =document.createElement('div');
    messageElemnent.innerText= message;
    messageElemnent.classList.add('message');
    messageElemnent.classList.add(position);
    messageContainer.append(messageElemnent);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= msgInp.value;
    append(`You ${message}`,'right');
    socket.emit('send', message);
    msgInp.value='';
})

const nam = prompt("Enter your name to join");
socket.emit('new-user-joined', nam);

socket.on('user-joined', nam=>{
    append(`${nam} joined the chat`,'right');
})

socket.on('receive', data=>{
    append(`${data.nam}: ${data.message}`,'left');
})

socket.on('left', nam=>{
    append(`${nam} left the chat`,'right')
})