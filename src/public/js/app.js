const socket = io()

const welcomeEl = document.getElementById('welcome')
const welcomeFormEl = welcomeEl.querySelector('form')
const roomEl = document.getElementById('room')

document.addEventListener('DOMContentLoaded', () => {
  roomEl.hidden = true
})

const showRoom = () => {
  welcomeEl.hidden = true
  roomEl.hidden = false
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