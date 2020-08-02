class ChatEngine {
    constructor(chatboxid,email){
        this.chatboxid = document.getElementById(chatboxid);
        this.useremail = email;
        this.socket = io.connect('http://127.0.0.1:5000');
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
            })
        });
    }

}