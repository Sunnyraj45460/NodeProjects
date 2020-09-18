const socket = io('http://localhost:3000')

const form=document.getElementById('form')
const text=document.getElementById('text')
const mdiv=document.getElementById('div')

appendMessage('You Connected','other')

const name=window.prompt("name ?")

socket.emit('user-name',name)

socket.on('user-connected', data => {
    appendMessage(data+' Connected','you')
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`,'other')
})

socket.on('chat-message', ({message,cname}) => {
    appendMessage(`${cname} => ${message}`,'you')
})

form.addEventListener('submit',e=>{
    e.preventDefault()
    appendMessage(text.value,'other')
    socket.emit('message',text.value)
    text.value=''
})

function appendMessage(data,classs) {
    const div=document.createElement('div')
    div.classList.add(classs)
    div.innerText=data
    mdiv.appendChild(div)
}