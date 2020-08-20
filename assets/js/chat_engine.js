let env = require('../../config/environment');
class ChatEngine {
    constructor(chatboxid,email){
        this.chatboxid = document.getElementById(chatboxid);
        this.useremail = email;
        if(env.name == 'development'){
            this.socket = io.connect('http://127.0.0.1:5000');
        }else {
            this.socket = io.connect('http://52.91.132.60:5000');
        }
        
        if(this.useremail){
            this.connectionHandler()
        }
    }
    connectionHandler(){
        let self = this ;
        this.socket.on('connect',function(){
            console.log('connection established');
            self.socket.emit('join_room',{
                user_email: self.useremail, 
                chatroom: 'codeial'
            });
            
            self.socket.on('user_joined',function(data){
                console.log('a user joined ',data);
            });
            
            let send = document.getElementById('send-message');
            console.log("send button",send)
            send.addEventListener('click',function(){
                console.log('send button clicked');
                let msg = document.getElementById('chat-message-input').value ;
                if(msg != ''){
                    self.socket.emit('send_message',{
                        msg: msg,
                        chatroom: 'codeial',
                        email : self.useremail
                    });
                }
            });

            self.socket.on('receive_message',function(data){
                console.log('message received:',data);
                // let newMessage = document.getElementById('chat-messages-list');
                let li = document.createElement('li');
                let messageType = 'other-message'

                if(data.email == self.useremail){
                    messageType = 'self-message'
                }
                let childMessage = document.createElement('span');
                childMessage.innerText = data.msg
                li.appendChild(childMessage)
                let subMessage = document.createElement('sub');
                subMessage.innerText = data.email;
                childMessage.appendChild(subMessage);
                li.classList.add(messageType);

                document.getElementById('chat-messages-list').appendChild(li);
            });

        });
    }

}