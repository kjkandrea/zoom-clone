const socket = io()

const welcomeEl = document.getElementById('welcome')
const welcomeFormEl = welcomeEl.querySelector('form')
const roomEl = document.getElementById('room')

document.addEventListener('DOMContentLoaded', () => {
  roomEl.hidden = true
})

const handleMessageSubmit = (evt, roomName) => {
  evt.preventDefault();
  const { value } = evt.target.querySelector('input')
  if (value.trim()) socket.emit('new_message', value, roomName, () => addMessage(`You: ${value}`))
}

const attachChat = (roomEl, roomName) => {
  const formEl = roomEl.querySelector('form')
  formEl.addEventListener('submit', evt => handleMessageSubmit(evt, roomName))
}

const showRoom = roomName => {
  welcomeEl.hidden = true
  roomEl.hidden = false
  roomEl.querySelector('h2').innerText = roomName;
  attachChat(roomEl, roomName)
}

const addMessage = message => {
  const target = roomEl.querySelector('ul')
  const el = document.createElement('li')
  el.innerText = message
  target.append(el)
}

const handleWelcomeSubmit = evt => {
  evt.preventDefault();
  const inputEl = evt.target.querySelector('input')
  socket.emit(
    'enter_room',
    inputEl.value,
    showRoom
  )
  inputEl.value = ''
}

welcomeFormEl.addEventListener('submit', handleWelcomeSubmit)

socket.on("welcome", () => {
  addMessage('someone joined!')
})

socket.on("bye", () => {
  addMessage('someone left!')
})

socket.on("new_message", addMessage)