const messageList = document.getElementById('message-list')
const form = document.getElementById('send-form')

const handleSubmit = evt => {
  evt.preventDefault();
  const { value } = evt.target.querySelector('input')
  alert(value)
}

form.addEventListener('submit', handleSubmit)

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener('open', () => console.log('🧚 WebSocket Connected to Server.'))
socket.addEventListener('close', () => console.log('🧚 WebSocket Disconnected from Server.'))

socket.addEventListener('message', msg => {
  console.log('server say : ', msg)
})

setTimeout(() => {
  socket.send('hi. server')
}, 2000)

