class ChatEngine{constructor(e,t){this.chatboxid=document.getElementById(e),this.useremail=t,this.socket=io.connect("http://127.0.0.1:5000"),this.useremail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established"),e.socket.emit("join_room",{user_email:e.useremail,chatroom:"codeial"}),e.socket.on("user_joined",(function(e){console.log("a user joined ",e)}));let t=document.getElementById("send-message");console.log("send button",t),t.addEventListener("click",(function(){console.log("send button clicked");let t=document.getElementById("chat-message-input").value;""!=t&&e.socket.emit("send_message",{msg:t,chatroom:"codeial",email:e.useremail})})),e.socket.on("receive_message",(function(t){console.log("message received:",t);let n=document.createElement("li"),s="other-message";t.email==e.useremail&&(s="self-message");let o=document.createElement("span");o.innerText=t.msg,n.appendChild(o);let c=document.createElement("sub");c.innerText=t.email,o.appendChild(c),n.classList.add(s),document.getElementById("chat-messages-list").appendChild(n)}))}))}}