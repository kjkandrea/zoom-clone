const socket = io()

const welcomeEl = document.getElementById('welcome')
const welcomeFormEl = welcomeEl.querySelector('form')
const roomEl = document.getElementById('room')

document.addEventListener('DOMContentLoaded', () => {
  roomEl.hidden = true
})

const showRoom = roomName => {
  welcomeEl.hidden = true
  roomEl.hidden = false
  roomEl.querySelector('h2').innerText = roomName;
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