const socket = io()

const welcomeEl = document.getElementById('welcome')
const welcomeFormEl = welcomeEl.querySelector('form')
const roomEl = document.getElementById('room')
const chatEl = roomEl.querySelector('.chat')
const chatFormEl = roomEl.querySelector('#chat-form')
const chatNicknameEl = roomEl.querySelector('#nickname-form')

document.addEventListener('DOMContentLoaded', () => {
  roomEl.style.display = 'none';
  welcomeFormEl.querySelector('input').focus()
})

const handleMessageSubmit = (evt, roomName) => {
  evt.preventDefault();
  const input = evt.target.querySelector('input')
  const { value } = input
  if (value.trim()) socket.emit('new_message', value, roomName, () => addMessage(`You: ${value}`))
  input.value = ''
}

const attachChat = (roomEl, roomName) => {
  chatFormEl.addEventListener('submit', evt => handleMessageSubmit(evt, roomName))
}

const showRoom = roomName => {
  welcomeEl.hidden = true
  roomEl.style.display = 'flex';
  roomEl.querySelector('h2').innerText = roomName;
  attachChat(roomEl, roomName)
  roomEl.querySelector('input').focus()
}

const addMessage = message => {
  const el = document.createElement('li')
  el.innerText = message
  chatEl.append(el)
  chatEl.scroll(0, chatEl.scrollHeight)
}

const handleWelcomeSubmit = evt => {
  evt.preventDefault();

  const { room, nickname } = evt.target;

  socket.emit(
    'enter_room',
    room.value,
    showRoom
  )
  socket.emit(
    'nickname',
    nickname.value
  )
  room.value = ''
  nickname.value = ''
}

welcomeFormEl.addEventListener('submit', handleWelcomeSubmit)

socket.on("welcome", nickname => {
  addMessage(nickname + ' joined!')
})

socket.on("bye", nickname => {
  addMessage(nickname + ' left!')
})

socket.on("new_message", addMessage)