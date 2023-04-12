const socket = io()    //we are getting this io from the client libraray
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')         //storing the name in the 'name' variable
} while(!name)    //the prompt won't go until the name is typed

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {                   //sending the message alongwith user to know who sent it
        user: name,                 //this is the name taken from prompt
        message: message.trim()   //when we press enter after writing a message, the cursor to moves to a new line,,
    }                             //so to avoid it we use trim to remove white spaces before and after
    // Append
    appendMessage(msg, 'outgoing')     //append the message to show it on screen ('outgoing' to show that it is an outgoing message)
    textarea.value = ''
    scrollToBottom()

    // Send to server
    socket.emit('message', msg)       //and then send to server (via websocket connection), so we are sending msg

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages
socket.on('message', (msg) => {     //'message' is just a name, it can be named anything
    appendMessage(msg, 'incoming')  //inserting the recieved message into the DOM
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
