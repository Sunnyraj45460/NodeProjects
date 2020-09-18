const socket = io('http://localhost:3000')

const roomContainer = document.getElementById('room-container')
const form=document.getElementById('form')
const text=document.getElementById('text')
const mdiv=document.getElementById('div')

if (form != null) {
    const name = prompt('What is your name?')
    appendMessage('You joined','other')
    socket.emit('new-user', roomName, name)
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      const message = text.value
      appendMessage(`You: ${message}`,'other')
      socket.emit('send-chat-message', roomName, message)
      text.value = ''
    })
}

socket.on('user-connected', data => {
    appendMessage(data+' Connected','you')
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`,'other')
})

socket.on('chat-message', ({message,name}) => {
    appendMessage(`${name} => ${message}`,'you')
})

socket.on('room-created', room => {
    const roomElement = document.createElement('div')
    roomElement.innerText = room
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = 'join'
    roomContainer.append(roomElement)
    roomContainer.append(roomLink)
})


function appendMessage(data,classs) {
    const div=document.createElement('div')
    div.classList.add(classs)
    div.innerText=data
    mdiv.appendChild(div)
}